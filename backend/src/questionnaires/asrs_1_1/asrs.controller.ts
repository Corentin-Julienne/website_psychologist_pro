import { Controller, Get, UseGuards, Param } from "@nestjs/common";
import { ASRSService } from "./asrs.service";

@Controller('users/:userId/eval-sessions/:sessionId/asrs')
export class ASRSController {

	constructor(private readonly asrsService: ASRSService) {};

	@UseGuards() // update this
	@Get()
	findASRSForUserSession(
		@Param('userId') userId: number,
		@Param('sessionId') sessionId: number
	) {
		return this.asrsService.findASRSForUserSession(userId, sessionId);
	}
}
