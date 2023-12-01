import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, QueryRunner } from 'typeorm';
import { ASRS } from "./asrs.entity";
import { EvalSession } from "../sessions/eval-session.entity";
import { IQuestionnaire } from "../sessions/questionnaire.interface";
import { QuestionnaireDto } from '../sessions/questionnaire.dto';
import { EvalSessionService } from '../sessions/eval-session.service';
import { ASRSResponseDto } from './asrs-response.dto';

@Injectable()
export class ASRSService implements IQuestionnaire {

	constructor(
		@InjectRepository(EvalSession)
		private evalSessionRepository : Repository<EvalSession>,
		@InjectRepository(ASRS)
		private asrsRepository: Repository<ASRS>,
		private evalSessionService: EvalSessionService
	) {};

	async getASRSReport(userId: number) : Promise<ASRSResponseDto> {
		const evalSession: EvalSession = await this.evalSessionService.retrieveEvalSession(userId);
		const asrs: ASRS = evalSession.asrs;

		const asrsResponseDto: ASRSResponseDto = new ASRSResponseDto();
		asrsResponseDto.partAScore = this.calculateASRSPartA(asrs.items);
		asrsResponseDto.partBScore = this.calculateASRSPartB(asrs.items);
		
		return asrsResponseDto;
	}

	private calculateASRSPartA(items: number[]): number {
		let score: number = 0;
	
		for (let i = 0; i < 6; i++) {
			if ((i < 3 && items[i] > 2) || (i >= 3 && items[i] > 3)) {
				score++;
			}
		}
		return score;
	}

	private calculateASRSPartB(items: number[]) : number {
		let score: number = 0;

		for (let i = 6; i < items.length; i++) {
			if (
				((i === 6 || i === 7 || i === 9 || i === 10 || i === 12 || i === 13 || i === 14 || i === 16) 
				&& items[i] > 3) || 
				((i === 8 || i === 11 || i === 15 || i === 17) 
				&& items[i] > 2) 
			) {
				score++;
			}
		}
		return score;
	}

	async create(sessionId: number, questionnaireDto: QuestionnaireDto, queryRunner: QueryRunner): Promise<ASRS> {
		const evalSession: EvalSession = await this.evalSessionRepository.findOne({
			where: { id: sessionId }
		});
		if (!evalSession) {
			throw new NotFoundException('eval session not found');
		}
		if (!this.evalSessionService.checkQuestionnaireDataIntegrity(questionnaireDto.items, 18, 1, 5)) {
			throw new BadRequestException('asrs send with integrity problems');
		}

		const newASRS = queryRunner.manager.create(ASRS, questionnaireDto);
		return queryRunner.manager.save(newASRS);
	}
}
