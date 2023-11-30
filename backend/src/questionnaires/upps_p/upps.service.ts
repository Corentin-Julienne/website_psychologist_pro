import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, QueryRunner } from 'typeorm';
import { UPPS } from "./upps.entity";
import { EvalSession } from '../sessions/eval-session.entity';
import { IQuestionnaire } from "../sessions/questionnaire.interface";
import { QuestionnaireDto } from '../sessions/questionnaire.dto';
import { EvalSessionService } from '../sessions/eval-session.service';
import { UPPSResponseDto } from './upps-response.dto';
import { StatsService } from '../../utils/stats/stats.service';

@Injectable()
export class UPPSService implements IQuestionnaire {

	constructor(
		@InjectRepository(EvalSession)
		private evalSessionRepository: Repository<EvalSession>,
		@InjectRepository(UPPS)
		private uppsRepository: Repository<UPPS>,
		private evalSessionService: EvalSessionService,
		private statsService: StatsService
	) {};

	async getUPPSReport(userId: number) : Promise<UPPSResponseDto | undefined> {
		const evalSession: EvalSession = await this.evalSessionService.retrieveEvalSession(userId);
		if (!evalSession) {
			throw new NotFoundException('eval session not found');
		}

		const uppsResponseDto: UPPSResponseDto = new UPPSResponseDto();
		this.computeUPPSScores(uppsResponseDto, evalSession.upps.items);

		return uppsResponseDto;
	}

	private computeUPPSScores(uppsResponseDto: UPPSResponseDto, items: number[]) : void {
		const itemsToReverse: number[] = [1, 2, 3, 6, 8, 9, 11, 13, 14, 16, 17, 19];
		items = this.statsService.processReverseItems(items, itemsToReverse, 4);

		const itemsPositiveUrgency: number[] = [3, 6, 11, 16];
		const itemsNegativeUrgency: number[] = [1, 9, 14, 19];
		const itemsPremeditation: number[] = [0, 5, 12, 18];
		const itemsPerseverance: number[] = [4, 7, 10, 15];
		
		for (let i: number = 0; i < items.length; i++) {
			if (itemsPositiveUrgency.includes(i)) {
				uppsResponseDto.positiveUrgency += items[i];
			} else if (itemsNegativeUrgency.includes(i)) {	
				uppsResponseDto.negativeUrgency += items[i];
			} else if (itemsPremeditation.includes(i)) {
				uppsResponseDto.premeditation += items[i];
			} else if (itemsPerseverance.includes(i)) {	
				uppsResponseDto.perseverance += items[i];
			} else {
				uppsResponseDto.sensationSeeking += items[i];
			}
		}

		this.calculateZScores(uppsResponseDto);
		this.calculatePercentiles(uppsResponseDto);
		this.calculateResult(uppsResponseDto);
	}

	private calculateResult(uppsResponseDto: UPPSResponseDto) : void {
		uppsResponseDto.positiveUrgencyResult = this.statsService.getCommentFromPercentile(
			uppsResponseDto.positiveUrgencyPercentile);
		uppsResponseDto.negativeUrgencyResult = this.statsService.getCommentFromPercentile(
			uppsResponseDto.negativeUrgencyPercentile);
		uppsResponseDto.premeditationResult = this.statsService.getCommentFromPercentile(
			uppsResponseDto.premeditationPercentile);
		uppsResponseDto.perseveranceResult = this.statsService.getCommentFromPercentile(
			uppsResponseDto.perseverancePercentile);
		uppsResponseDto.sensationSeekingResult = this.statsService.getCommentFromPercentile(
			uppsResponseDto.positiveUrgencyPercentile);
	}

	private calculatePercentiles(uppsResponseDto: UPPSResponseDto) : void {
		uppsResponseDto.positiveUrgencyPercentile = this.statsService.getPercentileFromZScore(
			uppsResponseDto.positiveUrgencyZ);
		uppsResponseDto.negativeUrgencyPercentile = this.statsService.getPercentileFromZScore(
			uppsResponseDto.negativeUrgencyZ);
		uppsResponseDto.premeditationPercentile = this.statsService.getPercentileFromZScore(
			uppsResponseDto.premeditationZ);
		uppsResponseDto.perseverancePercentile = this.statsService.getPercentileFromZScore(
			uppsResponseDto.perseveranceZ);
		uppsResponseDto.sensationSeekingPercentile = this.statsService.getPercentileFromZScore(
			uppsResponseDto.sensationSeekingZ);
	}

	private calculateZScores(uppsResponseDto: UPPSResponseDto) : void {
		uppsResponseDto.positiveUrgencyZ = this.statsService.calculateZScore(9.38, 
			uppsResponseDto.positiveUrgency, 2.73);
		uppsResponseDto.negativeUrgencyZ = this.statsService.calculateZScore(10.84, 
			uppsResponseDto.negativeUrgency, 2.38);
		uppsResponseDto.premeditationZ = this.statsService.calculateZScore(7.98, 
			uppsResponseDto.premeditation, 2.15);
		uppsResponseDto.perseveranceZ = this.statsService.calculateZScore(7.46, 
			uppsResponseDto.perseverance, 2.41);
		uppsResponseDto.sensationSeekingZ = this.statsService.calculateZScore(10.55, 
			uppsResponseDto.sensationSeeking, 2.72);
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
