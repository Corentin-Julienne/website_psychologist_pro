import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UPPS } from "./upps.entity";
import { EvalSession } from '../sessions/eval-sessions.entity';

@Injectable()
export class UPPSService {

	constructor(
		@InjectRepository(EvalSession)
		private evalSessionRepository: Repository<EvalSession>
	) {};

	async findUPPSForUserSession(userId: number, sessionId: number) : Promise<UPPS | undefined> {
		const evalSession: EvalSession = await this.evalSessionRepository.findOne({
			where: { id: sessionId, user: { id: userId } },
			relations: ['upps']
		});
		return evalSession?.upps;
	}
}
