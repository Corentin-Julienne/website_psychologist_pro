import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, QueryRunner } from 'typeorm';
import { BDI13 } from "./bdi13.entity";
import { EvalSession } from '../sessions/eval-session.entity';
import { IQuestionnaire } from "../sessions/questionnaire.interface";
import { QuestionnaireDto } from '../sessions/questionnaire.dto';
import { EvalSessionService } from '../sessions/eval-session.service';
import { BDI13ResponseDto } from './bdi13-response.dto';

@Injectable()
export class BDI13Service implements IQuestionnaire {

	constructor(
		@InjectRepository(EvalSession)
		private evalSessionRepository: Repository<EvalSession>,
		@InjectRepository(BDI13)
		private bdi13Repository: Repository<BDI13>,
		private evalSessionService: EvalSessionService
	) {};

	async getBDI13Report(userId: number) : Promise<BDI13ResponseDto | undefined> {
		const evalSession: EvalSession = await this.evalSessionService.retrieveEvalSession(userId);

		if (!evalSession) {
			throw new NotFoundException('eval session not found');
		}

		const bdi13ResponseDto: BDI13ResponseDto = new BDI13ResponseDto();
		this.computeBDI13Results(bdi13ResponseDto, evalSession.bdi13.items);

		return bdi13ResponseDto;
	}

	private computeBDI13Results(bdi13ResponseDto: BDI13ResponseDto, items: number[]) : void {
		bdi13ResponseDto.totalScore = 0;
		for (const item of items) {
			bdi13ResponseDto.totalScore += item;
		}

		if (bdi13ResponseDto.totalScore <= 4) {
			bdi13ResponseDto.result = 'absence';
		} else if (bdi13ResponseDto.totalScore > 4 && bdi13ResponseDto.totalScore <= 7) {
			bdi13ResponseDto.result = 'mild';
		} else if (bdi13ResponseDto.totalScore > 7 && bdi13ResponseDto.totalScore <= 15) {
			bdi13ResponseDto.result = 'moderate';
		} else {
			bdi13ResponseDto.result = 'severe';
		}

		switch (items[5]) {
			case 0:
				bdi13ResponseDto.suicidality = 'absence';
				break;
			case 1:
				bdi13ResponseDto.suicidality = 'mild';
				break;
			case 2:
				bdi13ResponseDto.suicidality = 'moderate';
				break;
			case 3:
				bdi13ResponseDto.suicidality = 'severe';
				break;
		}

		switch (items[7]) {
			case 0: 
				bdi13ResponseDto.hopelesness = 'absence';
				break;
			case 1:
				bdi13ResponseDto.hopelesness = 'mild';
				break;
			case 2:
				bdi13ResponseDto.hopelesness = 'moderate';
				break;
			case 3:
				bdi13ResponseDto.hopelesness = 'severe';
				break;
		}
	}

	async create(sessionId: number, questionnaireDto: QuestionnaireDto, queryRunner: QueryRunner): Promise<BDI13> {
		const evalSession: EvalSession = await this.evalSessionRepository.findOne({
			where: { id: sessionId }
		});
		if (!evalSession) {
			throw new NotFoundException('eval session not found');
		}
		if (!this.evalSessionService.checkQuestionnaireDataIntegrity(questionnaireDto.items, 20, 0, 3)) {
			throw new BadRequestException('bdi13 send with integrity problems');
		}

		const newBDI13 = queryRunner.manager.save(BDI13, questionnaireDto);
		return queryRunner.manager.save(newBDI13);
	}
}
