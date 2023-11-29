import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, QueryRunner } from 'typeorm';
import { TAS } from "./tas.entity";
import { EvalSession } from '../sessions/eval-session.entity';
import { IQuestionnaire } from "../sessions/questionnaire.interface";
import { QuestionnaireDto } from "../sessions/questionnaire.dto";
import { EvalSessionService } from '../sessions/eval-session.service';

@Injectable()
export class TASService implements IQuestionnaire {

	constructor(
		@InjectRepository(EvalSession)
		private evalSessionRepository: Repository<EvalSession>,
		@InjectRepository(TAS)
		private tasRepository: Repository<TAS>,
		private evalSessionService: EvalSessionService
	) {};

	async findTASForUserSession(userId: number, sessionId: number) : Promise<TAS | undefined> {
		const evalSession: EvalSession = await this.evalSessionRepository.findOne({
			where: { id: sessionId, user: { id: userId } },
			relations: ['tas']
		});
		return evalSession?.tas;
	}

	async create(sessionId: number, questionnaireDto: QuestionnaireDto, queryRunner: QueryRunner): Promise<TAS> {
		const evalSession: EvalSession = await this.evalSessionRepository.findOne({
			where: { id: sessionId }
		});
		if (!evalSession) {
			throw new NotFoundException('eval session not found');
		}
		if (!this.evalSessionService.checkQuestionnaireDataIntegrity(questionnaireDto.items, 20, 1 ,4)) {
			throw new BadRequestException('tas send with integrity problems');
		}

		const newTAS = queryRunner.manager.create(TAS, questionnaireDto);
		return queryRunner.manager.save(newTAS);
	}
}
