import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {

	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>
	) {};

	findAll() : Promise<User[]> {
		return this.userRepository.find();
	}

	// seed first admin user
	async seedFirstAdminUser() : Promise<void> {
		
	}
}