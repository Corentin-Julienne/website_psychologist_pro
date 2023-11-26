import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ASRS } from "./asrs.entity";
import { EvalSession } from "../sessions/eval-sessions.entity";

@Injectable()
export class ASRSService {

	constructor(
		@InjectRepository(EvalSession)
		private evalSessionRepository : Repository<EvalSession>
	) {};

	async findASRSForUserSession(userId: number, sessionId: number) : Promise<ASRS | undefined> {
		const evalSession: EvalSession = await this.evalSessionRepository.findOne({
			where: { id: sessionId, user: { id: userId } },
			relations: ['asrs']
		});
		return evalSession?.asrs;
	}
}
