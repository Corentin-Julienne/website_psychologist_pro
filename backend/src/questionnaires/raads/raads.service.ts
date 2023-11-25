import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RAADS } from "./raads.entity";

@Injectable()
export class RAADSService {

	constructor(
		@InjectRepository(RAADS)
		private raadsRepository: Repository<RAADS>
	) {};

	findAll() : Promise<RAADS[]> {
		return this.raadsRepository.find();
	}
}
