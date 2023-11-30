import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, QueryRunner } from 'typeorm';
import { TAS } from "./tas.entity";
import { EvalSession } from '../sessions/eval-session.entity';
import { IQuestionnaire } from "../sessions/questionnaire.interface";
import { QuestionnaireDto } from "../sessions/questionnaire.dto";
import { EvalSessionService } from '../sessions/eval-session.service';
import { TasResponseDto } from './tas-reponse.dto';
import { StatsService } from '../../utils/stats/stats.service';

@Injectable()
export class TASService implements IQuestionnaire {

	constructor(
		@InjectRepository(EvalSession)
		private evalSessionRepository: Repository<EvalSession>,
		@InjectRepository(TAS)
		private tasRepository: Repository<TAS>,
		private evalSessionService: EvalSessionService,
		private statsService: StatsService
	) {};

	async getTASReport(userId: number) : Promise<TasResponseDto | undefined> {
		const evalSession: EvalSession = await this.evalSessionService.retrieveEvalSession(userId);
		if (!evalSession) {
			throw new NotFoundException('eval session not found');
		}

		const tasResponseDto: TasResponseDto = new TasResponseDto();
		this.computeTASScores(tasResponseDto, evalSession.tas.items);

		return tasResponseDto;
	}

	private computeTASScores(tasResponseDto: TasResponseDto, items: number[]) : void {
		const reverseItemsIndex: number[] = []; // update
		items = this.statsService.processReverseItems(items, reverseItemsIndex, 4);
		
		const identifyEmotionsItems: number[] = [0, 2, 5, 6, 8, 12, 13];
		const describeEmotionsItems: number[] = [1, 3, 10, 11, 16];

		for (let i: number = 0; i < items.length; i++) {
			if (identifyEmotionsItems.includes(i)) {
				tasResponseDto.scoreIdentifyingEmotions += items[i];
			} else if (describeEmotionsItems.includes(i)) {
				tasResponseDto.scoreDescribingEmotions += items[i];
			} else {
				tasResponseDto.scoreOperatoryThinking += items[i];
			}
		}

		tasResponseDto.totalScore = tasResponseDto.scoreDescribingEmotions + tasResponseDto.scoreIdentifyingEmotions
		+ tasResponseDto.scoreOperatoryThinking;
		if (tasResponseDto.totalScore >= 56) {
			tasResponseDto.result = 'presence';
		} else {
			tasResponseDto.result = 'absence';
		}
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
