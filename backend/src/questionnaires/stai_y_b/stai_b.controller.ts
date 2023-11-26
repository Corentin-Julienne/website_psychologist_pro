import { Controller, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { STAIBService } from './stai_b.service';
import { STAIB } from "./stai_b.entity";

@Controller('users/:userId/eval-sessions/:sessionId/stai_b')
export class STAIBController {

	constructor(private readonly staibService: STAIBService) {};

	@UseGuards()
	@Get()
	findSTAIBForUserSession(
		@Param('userId') userId: number,
		@Param('sessionId') sessionId: number
	) : Promise<STAIB | undefined> {
		return this.staibService.findSTAIBForUserSession(userId, sessionId);
	}
}
