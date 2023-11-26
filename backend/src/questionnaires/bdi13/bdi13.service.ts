import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BDI13 } from "./bdi13.entity";
import { EvalSession } from '../sessions/eval-sessions.entity';

@Injectable()
export class BDI13Service {

	constructor(
		@InjectRepository(EvalSession)
		private evalSessionRepository: Repository<EvalSession>
	) {};

	async findBDI13ForUserSession(userId: number, sessionId: number) : Promise<BDI13 | undefined> {
		const evalSession: EvalSession = await this.evalSessionRepository.findOne({
			where: { id: sessionId, user: { id: userId } },
			relations: ['bdi13']
		});
		return evalSession?.bdi13;
	}
}
