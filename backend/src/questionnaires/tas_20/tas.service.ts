import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TAS } from "./tas.entity";

@Injectable()
export class TASService {

	constructor(
		@InjectRepository(TAS)
		private tasRepository: Repository<TAS>
	) {};

	findAll() : Promise<TAS[]> {
		return this.tasRepository.find();
	}
}
