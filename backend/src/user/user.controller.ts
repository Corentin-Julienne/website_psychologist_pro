import { Controller, Get, Post, Patch, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";

@Controller('users')
export class UserController {

	constructor(private userService: UserService) {};

	@Get()
	findAll() : Promise<User[]> {
		return this.userService.findAll();
	}

	
}
