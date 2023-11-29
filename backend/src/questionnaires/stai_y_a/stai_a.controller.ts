import { Controller, Get, UseGuards, Param} from "@nestjs/common";
import { STAIAService } from './stai_a.service';
import { STAIA } from "./stai_a.entity";
import { STAIAResponseDto } from './stai_a-reponse.dto';

@Controller('users/:userId/eval-sessions/:sessionId/stai_a')
export class STAIAController {

	constructor(private readonly staiaService: STAIAService) {};

	@UseGuards()
	@Get()
	getSTAIAReport(
		@Param('userId') userId: number
	) : Promise<STAIAResponseDto | undefined> {
		return this.staiaService.getSTAIAReport(userId);
	}
}
