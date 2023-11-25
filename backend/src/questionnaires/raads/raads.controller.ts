import { Controller, Get, Post, Patch, Put } from "@nestjs/common";
import { RAADS } from "./raads.entity";
import { RAADSService } from './raads.service';

@Controller('raads')
export class RAADSController {

	constructor(private readonly raadsService: RAADSService) {};

	@Get()
	findAll() : Promise<RAADS[]> {
		return this.raadsService.findAll();
	}
}
