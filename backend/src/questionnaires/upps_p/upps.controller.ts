import { Controller, Get, UseGuards, Param } from "@nestjs/common";
import { UPPSService } from "./upps.service";
import { UPPS } from "./upps.entity";

@Controller('users/:userId/eval-sessions/:sessionId/upps')
export class UPPSController {

	constructor(private readonly uppsService: UPPSService) {};

	@UseGuards() // update this
	@Get()
	findUPPSForUserSession(
		@Param('userId') userId: number,
		@Param('sessionId') sessionId: number
	) : Promise<UPPS | undefined> {
		return this.uppsService.findUPPSForUserSession(userId, sessionId);
	}
}
