import { Controller, Get, UseGuards, Param } from "@nestjs/common";
import { UPPSService } from "./upps.service";
import { UPPS } from "./upps.entity";
import { UPPSResponseDto } from './upps-response.dto';

@Controller('users/:userId/eval-sessions/:sessionId/upps')
export class UPPSController {

	constructor(private readonly uppsService: UPPSService) {};

	@UseGuards() // update this
	@Get()
	findUPPSForUserSession(
		@Param('userId') userId: number,
	) : Promise<UPPSResponseDto | undefined> {
		return this.uppsService.getUPPSReport(userId);
	}
}
