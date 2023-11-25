import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UPPS } from "./upps.entity";

@Injectable()
export class UPPSService {

	constructor(
		@InjectRepository(UPPS)
		private uppsRepository: Repository<UPPS>
	) {};

	findAll() : Promise<UPPS[]> {
		return this.uppsRepository.find();
	}
}
