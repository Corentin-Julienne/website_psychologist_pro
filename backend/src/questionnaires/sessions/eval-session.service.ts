import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QueryRunner, Repository } from "typeorm";
import { EvalSessionDto } from "./eval-session.dto";
import { EvalSession } from './eval-session.entity';
import { User } from "../../user/user.entity";
import { ASRSService } from "../asrs_1_1/asrs.service";
import { BDI13Service } from '../bdi13/bdi13.service';
import { RAADSService } from '../raads/raads.service';
import { STAIAService } from '../stai_y_a/stai_a.service';
import { STAIBService } from '../stai_y_b/stai_b.service';
import { TASService } from '../tas_20/tas.service';
import { UPPSService } from '../upps_p/upps.service';

@Injectable()
export class EvalSessionService {

	constructor(
		@InjectRepository(EvalSession)
		private evalSessionRepository: Repository<EvalSession>,
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private asrsService: ASRSService,
		private bdi13Service: BDI13Service,
		private raadsService: RAADSService,
		private staiaService: STAIAService,
		private staibService: STAIBService,
		private tasService: TASService,
		private uppsService: UPPSService
	) {};

	async retrieveEvalSession(userId: number) : Promise<EvalSession | undefined> {
		const evalSession: EvalSession = await this.evalSessionRepository.findOne({
			where: { user: { id: userId } }
		});
		return evalSession;
	}

	async createEvalSession(userId: number, evalSessionDto: EvalSessionDto, queryRunner: QueryRunner) 
	: Promise<EvalSession> {
		const user = await this.userRepository.findOne({
			where: { id: userId }
		});
		if (!user) {
			throw new NotFoundException('user not found');
		}
		// creating the eval_session itself
		const evalSession = this.evalSessionRepository.create(evalSessionDto);
		return this.fullfillEvalSession(evalSession, evalSessionDto, queryRunner);
	}

	private async fullfillEvalSession(evalSession: EvalSession, evalSessionDto: EvalSessionDto, 
		queryRunner: QueryRunner) : Promise<EvalSession> {
		const savedEvalSession = await queryRunner.manager.save(evalSession);
		
		for (const questionnaire of evalSessionDto.questionnaires) {
			let questionnaireService!: any;
			switch (questionnaire.type) {
				case 'asrs':
					questionnaireService = this.asrsService; 
					break;
				case 'bdi13':
					questionnaireService = this.bdi13Service;
					break;
				case 'raads':
					questionnaireService = this.raadsService;
					break;
				case 'stai_a':
					questionnaireService = this.staiaService;
					break;
				case 'stai_b':
					questionnaireService = this.staibService;
					break;
				case 'tas':
					questionnaireService = this.tasService;
					break;
				case 'upps':
					questionnaireService = this.uppsService;
					break;
				default: 
					throw Error('non recognized questionnaire');
			}
			questionnaireService.create(evalSession.id, questionnaire, queryRunner);
		}
		return savedEvalSession;
	}

	async deleteEvalSession(evalSessionId: number) : Promise<void> {
		const evalSession: EvalSession = await this.evalSessionRepository.findOne({
			where: { id: evalSessionId }
		});

		if (!evalSession) {
			throw new NotFoundException('eval session not found');
		}
		await this.evalSessionRepository.delete(evalSessionId);
	}

	checkQuestionnaireDataIntegrity(items: number[], length: number, min: number, max: number) : boolean {
		if (items.length !== length) {
			return false;
		}
		for (const item of items) {
			if (item < min || item > max) {
				return false;
			}
		}
		return true;
	}
}
