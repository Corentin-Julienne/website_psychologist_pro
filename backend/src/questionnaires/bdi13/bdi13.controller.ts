import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { BDI13Service } from "./bdi13.service";
import { BDI13 } from "./bdi13.entity";
import { BDI13ResponseDto } from './bdi13-response.dto';

@Controller('users/:userId/eval-sessions/:sessionId/asrs')
export class BDI13Controller {

	constructor(private readonly bdiService: BDI13Service) {};

	@UseGuards()
	@Get()
	getBDI13Report(
		@Param('userId') userId: number
	) : Promise<BDI13ResponseDto | undefined> {
		return this.bdiService.getBDI13Report(userId);
	}
}
