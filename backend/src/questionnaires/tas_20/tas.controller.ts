import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { TASService } from './tas.service';
import { TAS } from "./tas.entity";

@Controller('users/:userId/eval-sessions/:sessionId/tas')
export class TASController {

	constructor(private readonly tasService: TASService) {};

	@UseGuards() // update this
	@Get()
	findTASForUserSession(
		@Param('userId') userId: number,
		@Param('sessionId') sessionId: number
	) : Promise<TAS | undefined> {
		return this.tasService.findTASForUserSession(userId, sessionId);
	}
}
