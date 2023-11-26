import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { STAIB } from './stai_b.entity';
import { EvalSession } from '../sessions/eval-sessions.entity';

@Injectable()
export class STAIBService {

	constructor(
		@InjectRepository(EvalSession)
		private evalSessionRepository: Repository<EvalSession>
	) {};

	async findSTAIBForUserSession(userId: number, sessionId: number) : Promise<STAIB | undefined> {
		const evalSession: EvalSession = await this.evalSessionRepository.findOne({
			where: { id: sessionId, user: { id: userId } },
			relations: ['stai_b']
		});
		return evalSession?.staiB;
	}
}
