import { Controller, Get, UseGuards, Param} from "@nestjs/common";
import { STAIAService } from './stai_a.service';
import { STAIA } from "./stai_a.entity";

@Controller('users/:userId/eval-sessions/:sessionId/stai_a')
export class STAIAController {

	constructor(private readonly staiaService: STAIAService) {};

	@UseGuards() // update that
	@Get()
	findSTAIAForUserSession(
		@Param('userId') userId: number,
		@Param('sessionId') sessionId: number
	) : Promise<STAIA | undefined> {
		return this.staiaService.findSTAIAForUserSession(userId, sessionId);
	}
}
