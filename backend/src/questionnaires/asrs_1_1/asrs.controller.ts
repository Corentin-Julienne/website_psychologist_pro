import { Controller, Get, UseGuards, Param } from "@nestjs/common";
import { ASRSService } from "./asrs.service";
import { ASRSResponseDto } from './asrs-response.dto';

@Controller('users/:userId/eval-sessions/:sessionId/asrs')
export class ASRSController {

	constructor(private readonly asrsService: ASRSService) {};

	@UseGuards()
	@Get()
	getASRSReport(
		@Param('userId') userId: number 
	) : Promise<ASRSResponseDto | undefined> {
		return this.asrsService.getASRSReport(userId);
	}
}
