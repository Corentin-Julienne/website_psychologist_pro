import { Controller, Get, UseGuards, Param } from "@nestjs/common";
import { RAADS } from "./raads.entity";
import { RAADSService } from './raads.service';
import { RAADSResponseDto } from './raads-response.dto';

@Controller('users/:userId/eval-sessions/:sessionId/raads')
export class RAADSController {

	constructor(private readonly raadsService: RAADSService) {};

	@UseGuards() // update this
	@Get()
	getRAADSReport(
		@Param('userId') userId: number
	) : Promise<RAADSResponseDto | undefined> {
		return this.getRAADSReport(userId);
	}
}
