import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, QueryRunner } from 'typeorm';
import { UPPS } from "./upps.entity";
import { EvalSession } from '../sessions/eval-session.entity';
import { IQuestionnaire } from "../sessions/questionnaire.interface";
import { QuestionnaireDto } from '../sessions/questionnaire.dto';
import { EvalSessionService } from '../sessions/eval-session.service';

@Injectable()
export class UPPSService implements IQuestionnaire {

	constructor(
		@InjectRepository(EvalSession)
		private evalSessionRepository: Repository<EvalSession>,
		@InjectRepository(UPPS)
		private uppsRepository: Repository<UPPS>,
		private evalSessionService: EvalSessionService
	) {};

	async findUPPSForUserSession(userId: number, sessionId: number) : Promise<UPPS | undefined> {
		const evalSession: EvalSession = await this.evalSessionRepository.findOne({
			where: { id: sessionId, user: { id: userId } },
			relations: ['upps']
		});
		return evalSession?.upps;
	}

	async create(sessionId: number, questionnaireDto: QuestionnaireDto, queryRunner: QueryRunner): Promise<UPPS> {
		const evalSession: EvalSession = await this.evalSessionRepository.findOne({
			where: { id: sessionId }
		});
		if (!evalSession) {
			throw new NotFoundException('eval session not found');
		}
		if (!this.evalSessionService.checkQuestionnaireDataIntegrity(questionnaireDto.items, 20, 1 ,4)) {
			throw new BadRequestException('upps send with integrity problems');
		}

		const newUPPS = queryRunner.manager.create(UPPS, questionnaireDto);
		return queryRunner.manager.save(newUPPS);
	}
}
