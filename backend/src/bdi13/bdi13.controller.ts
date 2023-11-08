import { Controller, Get, Post, Patch } from "@nestjs/common";
import { BDI13Service } from "./bdi13.service";
import { BDI13 } from "./bdi13.entity";

@Controller('bdi_13')
export class BDI13Controller {

	constructor(private readonly bdiService: BDI13Service) {};

	@Get()
	findAll() : Promise<BDI13[]> {
		return this.bdiService.findAll();
	}

	


}
