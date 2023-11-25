import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BDI13 } from "./bdi13.entity";

@Injectable()
export class BDI13Service {

	constructor(
		@InjectRepository(BDI13)
		private bdiRepository: Repository<BDI13>
	) {};

	// add method for CRUD ops

	findAll() : Promise<BDI13[]> {
		return this.bdiRepository.find();
	}
}
