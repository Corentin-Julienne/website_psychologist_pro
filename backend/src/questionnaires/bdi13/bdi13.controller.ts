import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { BDI13Service } from "./bdi13.service";
import { BDI13 } from "./bdi13.entity";

@Controller('users/:userId/eval-sessions/:sessionId/asrs')
export class BDI13Controller {

	constructor(private readonly bdiService: BDI13Service) {};

	@UseGuards() // update this
	@Get()
	findBDI13ForUserSession(
		@Param('userId') userId: number,
		@Param('sessionId') sessionId: number
	) : Promise<BDI13 | undefined> {
		return this.bdiService.findBDI13ForUserSession(userId, sessionId);
	}	
}
