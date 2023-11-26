import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { STAIA } from "./stai_a.entity";
import { EvalSession } from '../sessions/eval-sessions.entity';

@Injectable()
export class STAIAService {

	constructor(
		@InjectRepository(EvalSession)
		private evalSessionRepository: Repository<EvalSession>
	) {};

	async findSTAIAForUserSession(userId: number, sessionId: number) : Promise<STAIA | undefined> {
		const evalSession: EvalSession = await this.evalSessionRepository.findOne({
			where: { id: sessionId, user: { id: userId } },
			relations: ['stai_a']
		});
		return evalSession?.staiA;
	}
}
