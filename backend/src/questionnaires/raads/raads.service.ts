import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RAADS } from "./raads.entity";
import { EvalSession } from '../sessions/eval-sessions.entity';

@Injectable()
export class RAADSService {

	constructor(
		@InjectRepository(EvalSession)
		private evalSessionRepository: Repository<EvalSession>
	) {};

	async findRAADSForUserSession(userId: number, sessionId: number) : Promise<RAADS | undefined> {
		const evalSession: EvalSession = await this.evalSessionRepository.findOne({
			where: { id: sessionId, user: { id: userId } }, 
			relations: ['raads']
		});
		return evalSession?.raads;
	}
}
