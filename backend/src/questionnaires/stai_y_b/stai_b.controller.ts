import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { STAIBService } from './stai_b.service';
import { STAIB } from "./stai_b.entity";
import { STAIBResponseDto } from "./stai_b-reponse.dto";

@Controller('users/:userId/eval-sessions/:sessionId/stai_b')
export class STAIBController {

	constructor(private readonly staibService: STAIBService) {};

	@UseGuards()
	@Get()
	getSTAIBReport(
		@Param('userId') userId: number
	) : Promise<STAIBResponseDto | undefined> {
		return this.staibService.getSTAIBReport(userId);
	}
}
