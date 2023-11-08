import { Controller, Get, Post, Patch, Put } from "@nestjs/common";
import { TASService } from './tas.service';
import { TAS } from "./tas.entity";

@Controller('tas_20')
export class TASController {

	constructor(private readonly tasService: TASService) {};

	@Get()
	findAll() : Promise<TAS[]> {
		return this.tasService.findAll();
	}
}
