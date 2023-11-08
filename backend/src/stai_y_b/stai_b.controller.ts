import { Controller, Get, Patch, Post, Put } from "@nestjs/common";
import { STAIBService } from './stai_b.service';
import { STAIB } from "./stai_b.entity";

@Controller('stai_b')
export class STAIBController {

	constructor(private readonly staibService: STAIBService) {};

	@Get()
	findAll() : Promise<STAIB[]> {
		return this.staibService.findAll();
	}
}
