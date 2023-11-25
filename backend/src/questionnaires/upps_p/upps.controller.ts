import { Controller, Get, Post, Patch, Put } from "@nestjs/common";
import { UPPSService } from "./upps.service";
import { UPPS } from "./upps.entity";

@Controller('upps')
export class UPPSController {

	constructor(private readonly uppsService: UPPSService) {};

	@Get()
	FindAll() : Promise<UPPS[]> {
		return this.FindAll();
	}
}
