import { Controller, Get, Post, Patch, Put, UseGuards, Param } from "@nestjs/common";
import { RAADS } from "./raads.entity";
import { RAADSService } from './raads.service';

@Controller('users/:userId/eval-sessions/:sessionId/raads')
export class RAADSController {

	constructor(private readonly raadsService: RAADSService) {};

	@UseGuards() // update this
	@Get()
	findRAADSForUserSession(
		@Param('userId') userId: number,
		@Param('sessionId') sessionId: number
	) : Promise<RAADS | undefined> {
		return this.findRAADSForUserSession(userId, sessionId);
	}
}
