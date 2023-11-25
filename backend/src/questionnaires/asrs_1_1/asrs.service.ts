import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ASRS } from "./asrs.entity";

@Injectable()
export class ASRSService {

	constructor(
		@InjectRepository(ASRS)
		private asrsRepository : Repository<ASRS>
	) {};

	findAll() : Promise<ASRS[]> {
		return this.asrsRepository.find();
	}
}
