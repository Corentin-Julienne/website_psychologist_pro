import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner } from 'typeorm';
import { STAIB } from './stai_b.entity';
import { STAIBResponseDto } from "./stai_b-reponse.dto";
import { EvalSession } from '../sessions/eval-session.entity';
import { IQuestionnaire } from "../sessions/questionnaire.interface";
import { QuestionnaireDto } from "../sessions/questionnaire.dto";
import { EvalSessionService } from "../sessions/eval-session.service";
import { StatsService } from '../../utils/stats/stats.service';

@Injectable()
export class STAIBService implements IQuestionnaire {

	constructor(
		@InjectRepository(EvalSession)
		private evalSessionRepository: Repository<EvalSession>,
		@InjectRepository(STAIB)
		private staibRepository: Repository<STAIB>,
		private evalSessionService: EvalSessionService,
		private statsService: StatsService
	) {};

	async getSTAIBReport(userId: number) : Promise<STAIBResponseDto | undefined> {
		const evalSession: EvalSession = await this.evalSessionService.retrieveEvalSession(userId);
		if (!evalSession) {
			throw new NotFoundException('eval session not found');
		}

		const staibResponseDto: STAIBResponseDto = new STAIBResponseDto();
		this.computeSTAIBResults(staibResponseDto, evalSession.staiB.items);

		return staibResponseDto;
	}

	private computeSTAIBResults(staibResponseDto: STAIBResponseDto, items: number[]) : void {
		const reverseItemsIndex: number[] = [0, 2, 5, 6, 9, 12, 13, 15, 18];
		items = this.statsService.processReverseItems(items, reverseItemsIndex, 4);

		for (const item of items) {
			staibResponseDto.totalScore += item;
		}

		if (staibResponseDto.totalScore <= 35) {
			staibResponseDto.result = 'very low';
		} else if (staibResponseDto.totalScore >= 36 && staibResponseDto.totalScore <= 45) {
			staibResponseDto.result = 'low';
		} else if (staibResponseDto.totalScore >= 46 && staibResponseDto.totalScore <= 55) {
			staibResponseDto.result = 'medium';
		} else if (staibResponseDto.totalScore >= 56 && staibResponseDto.totalScore <= 65) {
			staibResponseDto.result = 'high';
		} else {
			staibResponseDto.result = 'very high';
		}
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
