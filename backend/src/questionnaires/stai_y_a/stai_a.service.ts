import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, QueryRunner } from 'typeorm';
import { STAIA } from "./stai_a.entity";
import { EvalSession } from '../sessions/eval-session.entity';
import { IQuestionnaire } from "../sessions/questionnaire.interface";
import { QuestionnaireDto } from '../sessions/questionnaire.dto';
import { EvalSessionService } from '../sessions/eval-session.service';
import { STAIAResponseDto } from "./stai_a-reponse.dto";

@Injectable()
export class STAIAService implements IQuestionnaire {

	constructor(
		@InjectRepository(EvalSession)
		private evalSessionRepository: Repository<EvalSession>,
		@InjectRepository(STAIA)
		private staiaRepository: Repository<STAIA>,
		private evalSessionService: EvalSessionService
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
