import { Controller, Get, Post, Patch, Put } from "@nestjs/common";
import { ASRSService } from "./asrs.service";
import { ASRS } from "./asrs.entity";

@Controller('asrs_1_1')
export class ASRSController {

	constructor(private readonly asrsService: ASRSService) {};

	@Get()
	findAll() : Promise<ASRS[]> {
		return this.asrsService.findAll();
	}
}
