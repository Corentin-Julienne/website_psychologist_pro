import { Controller, Get, Post, Patch, Put} from "@nestjs/common";
import { STAIAService } from './stai_a.service';
import { STAIA } from "./stai_a.entity";

@Controller('stai_a')
export class STAIAController {

	constructor(private readonly staiaService: STAIAService) {};

	@Get()
	findAll() : Promise<STAIA[]> {
		return this.staiaService.findAll();
	}
}
