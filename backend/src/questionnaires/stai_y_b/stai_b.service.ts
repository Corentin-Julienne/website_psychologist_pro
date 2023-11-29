import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner } from 'typeorm';
import { STAIB } from './stai_b.entity';
import { EvalSession } from '../sessions/eval-session.entity';
import { IQuestionnaire } from "../sessions/questionnaire.interface";
import { QuestionnaireDto } from "../sessions/questionnaire.dto";
import { EvalSessionService } from "../sessions/eval-session.service";

@Injectable()
export class STAIBService implements IQuestionnaire {

	constructor(
		@InjectRepository(EvalSession)
		private evalSessionRepository: Repository<EvalSession>,
		@InjectRepository(STAIB)
		private staibRepository: Repository<STAIB>,
		private evalSessionService: EvalSessionService
	) {};

	async findSTAIBForUserSession(userId: number, sessionId: number) : Promise<STAIB | undefined> {
		const evalSession: EvalSession = await this.evalSessionRepository.findOne({
			where: { id: sessionId, user: { id: userId } },
			relations: ['stai_b']
		});
		return evalSession?.staiB;
	}

	async create(sessionId: number, questionnaireDto: QuestionnaireDto, queryRunner: QueryRunner): Promise<STAIB> {
		const evalSession: EvalSession = await this.evalSessionRepository.findOne({
			where: { id: sessionId }
		});
		if (!evalSession) {
			throw new NotFoundException('eval session not found');
		}
		if (!this.evalSessionService.checkQuestionnaireDataIntegrity(questionnaireDto.items, 20, 1, 4)) {
			throw new BadRequestException('stai_b send with integrity problems');
		}

		const newSTAIB = queryRunner.manager.create(STAIB, questionnaireDto);
		return queryRunner.manager.save(newSTAIB);
	}
}
