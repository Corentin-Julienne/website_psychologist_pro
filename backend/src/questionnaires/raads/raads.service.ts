import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, QueryRunner } from 'typeorm';
import { RAADS } from "./raads.entity";
import { EvalSession } from '../sessions/eval-session.entity';
import { IQuestionnaire } from "../sessions/questionnaire.interface";
import { QuestionnaireDto } from "../sessions/questionnaire.dto";
import { EvalSessionService } from '../sessions/eval-session.service';
import { StatsService } from "../../utils/stats/stats.service";
import { RAADSResponseDto } from './raads-response.dto';

@Injectable()
export class RAADSService implements IQuestionnaire {

	constructor(
		@InjectRepository(EvalSession)
		private evalSessionRepository: Repository<EvalSession>,
		@InjectRepository(RAADS)
		private raadsRepository: Repository<RAADS>,
		private evalSessionService: EvalSessionService,
		private statsService: StatsService
	) {};

	async getRAADSReport(userId: number) : Promise<RAADSResponseDto | undefined> {
		const evalSession: EvalSession = await this.evalSessionService.retrieveEvalSession(userId);

		if (!evalSession) {
			throw new NotFoundException('eval session not found');
		}

		const raadsResponseDto: RAADSResponseDto = new RAADSResponseDto();
		this.computeRAADSResults(raadsResponseDto, evalSession.raads.items);

		return raadsResponseDto;
	}

	private computeRAADSResults(raadsResponseDto: RAADSResponseDto, items: number[]) : void {
		const itemsToReverse: number[] = [0, 5, 17, 22, 25, 32, 36, 42, 46, 47, 52, 57, 61, 67, 71, 76];
		items = this.statsService.processReverseItems(items, itemsToReverse, 3);

		const socialIteractionsItems: number[] = []; // update
		const specificInterestsItems: number[] = []; // update
		const languageItems: number[] = []; // update

		for (let i: number = 0; i < items.length; i++) {
			if (socialIteractionsItems.includes(i)) {
				raadsResponseDto.socialInteractions += items[i];
			} else if (specificInterestsItems.includes(i)) {
				raadsResponseDto.specificInterests += items[i];
			} else if (languageItems.includes(i)) {
				raadsResponseDto.language += items[i];
			} else {
				raadsResponseDto.sensoriMotor += items[i];
			}
		}
		raadsResponseDto.totalScore = raadsResponseDto.socialInteractions + raadsResponseDto.specificInterests +
			raadsResponseDto.language + raadsResponseDto.sensoriMotor;
		this.calculateRAADSScores(raadsResponseDto);
	}

	private calculateRAADSScores(raadsResponseDto: RAADSResponseDto) : void {
		if (raadsResponseDto.socialInteractions >= 31) {
			raadsResponseDto.socialInteractionsResult = true;
		} 

		if (raadsResponseDto.specificInterests >= 15) {
			raadsResponseDto.specificInterestsResult = true;
		} 

		if (raadsResponseDto.language >= 4) {
			raadsResponseDto.languageResult = true;
		} 

		if (raadsResponseDto.sensoriMotor >= 16) {
			raadsResponseDto.sensoriMotorResult = true;
		} 

		if (raadsResponseDto.totalScore >= 80) {
			raadsResponseDto.totalScoreResult = true;
		}
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
