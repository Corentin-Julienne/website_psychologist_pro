import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, QueryRunner } from 'typeorm';
import { RAADS } from "./raads.entity";
import { EvalSession } from '../sessions/eval-session.entity';
import { IQuestionnaire } from "../sessions/questionnaire.interface";
import { QuestionnaireDto } from "../sessions/questionnaire.dto";
import { EvalSessionService } from '../sessions/eval-session.service';

@Injectable()
export class RAADSService implements IQuestionnaire {

	constructor(
		@InjectRepository(EvalSession)
		private evalSessionRepository: Repository<EvalSession>,
		@InjectRepository(RAADS)
		private raadsRepository: Repository<RAADS>,
		private evalSessionService: EvalSessionService
	) {};

	async findRAADSForUserSession(userId: number, sessionId: number) : Promise<RAADS | undefined> {
		const evalSession: EvalSession = await this.evalSessionRepository.findOne({
			where: { id: sessionId, user: { id: userId } }, 
			relations: ['raads']
		});
		return evalSession?.raads;
	}

	async create(sessionId: number, questionnaireDto: QuestionnaireDto, queryRunner: QueryRunner): Promise<RAADS> {
		const evalSession: EvalSession = await this.evalSessionRepository.findOne({
			where: { id: sessionId }
		});
		if (!evalSession) {
			throw new NotFoundException('eval session not found');
		}
		if (!this.evalSessionService.checkQuestionnaireDataIntegrity(questionnaireDto.items, 20, 1, 4)) { 
			throw new BadRequestException('raads send with integrity problems');
		}

		const newRAADS = queryRunner.manager.create(RAADS, questionnaireDto);
		return queryRunner.manager.save(newRAADS);
	}
}
