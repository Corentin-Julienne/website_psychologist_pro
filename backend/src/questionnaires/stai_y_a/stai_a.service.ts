import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, QueryRunner } from 'typeorm';
import { STAIA } from "./stai_a.entity";
import { EvalSession } from '../sessions/eval-session.entity';
import { IQuestionnaire } from "../sessions/questionnaire.interface";
import { QuestionnaireDto } from '../sessions/questionnaire.dto';
import { EvalSessionService } from '../sessions/eval-session.service';
import { STAIAResponseDto } from "./stai_a-reponse.dto";
import { StatsService } from '../../utils/stats/stats.service';

@Injectable()
export class STAIAService implements IQuestionnaire {

	constructor(
		@InjectRepository(EvalSession)
		private evalSessionRepository: Repository<EvalSession>,
		@InjectRepository(STAIA)
		private staiaRepository: Repository<STAIA>,
		private evalSessionService: EvalSessionService,
		private statsService: StatsService
	) {};

	async getSTAIAReport(userId: number) : Promise<STAIAResponseDto | undefined> {
		const evalSession: EvalSession = await this.evalSessionService.retrieveEvalSession(userId);
		if (!evalSession) {
			throw new NotFoundException('eval session not found');
		}

		const staiaResponseDto: STAIAResponseDto = new STAIAResponseDto();
		this.computeSTAIAResults(staiaResponseDto, evalSession.staiA.items);

		return staiaResponseDto;
	}

	private computeSTAIAResults(staiaResponseDto: STAIAResponseDto, items: number[]) : void {
		const reverseItemsIndex: number[] = [0, 1, 4, 7, 9, 10, 14, 15, 18, 19];
		items = this.statsService.processReverseItems(items, reverseItemsIndex, 4);

		for (const item of items) {
			staiaResponseDto.totalScore += item;
		}

		if (staiaResponseDto.totalScore <= 35) {
			staiaResponseDto.result = 'very low';
		} else if (staiaResponseDto.totalScore >= 36 && staiaResponseDto.totalScore <= 45) {
			staiaResponseDto.result = 'low';
		} else if (staiaResponseDto.totalScore >= 46 && staiaResponseDto.totalScore <= 55) {
			staiaResponseDto.result = 'medium';
		} else if (staiaResponseDto.totalScore >= 56 && staiaResponseDto.totalScore <= 65) {
			staiaResponseDto.result = 'high';
		} else {
			staiaResponseDto.result = 'very high';
		}
	}

	async create(sessionId: number, questionnaireDto: QuestionnaireDto, queryRunner: QueryRunner): Promise<STAIA> {
		const evalSession: EvalSession = await this.evalSessionRepository.findOne({
			where: { id: sessionId }
		});
		if (!evalSession) {
			throw new NotFoundException('eval session not found');
		}
		if (!this.evalSessionService.checkQuestionnaireDataIntegrity(questionnaireDto.items, 20, 1, 4)) {
			throw new BadRequestException('stai_a send with integrity problems');
		}

		const newSTAIA =  queryRunner.manager.create(STAIA, questionnaireDto);
		return queryRunner.manager.save(newSTAIA);
	}
}
