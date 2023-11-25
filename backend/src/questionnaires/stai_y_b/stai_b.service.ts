import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { STAIB } from './stai_b.entity';

@Injectable()
export class STAIBService {

	constructor(
		@InjectRepository(STAIB)
		private staibRepository: Repository<STAIB>
	) {};

	findAll() : Promise<STAIB[]> {
		return this.staibRepository.find();
	}
}
