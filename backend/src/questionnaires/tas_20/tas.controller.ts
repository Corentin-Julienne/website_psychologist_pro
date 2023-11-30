import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { TASService } from './tas.service';
import { TAS } from "./tas.entity";
import { TasResponseDto } from "./tas-reponse.dto";

@Controller('users/:userId/eval-sessions/:sessionId/tas')
export class TASController {

	constructor(private readonly tasService: TASService) {};

	@UseGuards() // update this
	@Get()
	getTASReport(
		@Param('userId') userId: number
	) : Promise<TasResponseDto | undefined> {
		return this.getTASReport(userId);
	}
}
