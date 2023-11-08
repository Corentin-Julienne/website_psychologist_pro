import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { STAIA } from "./stai_a.entity";

@Injectable()
export class STAIAService {

	constructor(
		@InjectRepository(STAIA)
		private staiaRepository: Repository<STAIA>
	) {};

	findAll() : Promise<STAIA[]> {
		return this.staiaRepository.find();
	}
}
