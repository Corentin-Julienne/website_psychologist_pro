import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TAS } from "./tas.entity";
import { EvalSession } from '../sessions/eval-sessions.entity';

@Injectable()
export class TASService {

	constructor(
		@InjectRepository(EvalSession)
		private evalSessionRepository: Repository<EvalSession>
	) {};

	async findTASForUserSession(userId: number, sessionId: number) : Promise<TAS | undefined> {
		const evalSession: EvalSession = await this.evalSessionRepository.findOne({
			where: { id: sessionId, user: { id: userId } },
			relations: ['tas']
		});
		return evalSession?.tas;
	}
}
