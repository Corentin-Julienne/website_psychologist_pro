import { Controller, Get, Post, Patch, Put, UseGuards, Param, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { UpdateAdminDto } from './update-admin.dto';
import { CreateUserDto } from "./create-user.dto";

@Controller('users')
export class UserController {

	constructor(private userService: UserService) {};

	@UseGuards()
	@Get()
	findAll() : Promise<User[]> {
		return this.userService.findAll();
	}

	@UseGuards()
	@Get()
	findUserByUsername(username: string) : Promise<User | undefined> {

	}

	@UseGuards()
	@Get()
	findUserById(userId: number) : Promise<User | undefined> {

	}

	// create a standard user, an eval session containing all the questionnaires
	@Post()
	createStandardUser(createUserDto: CreateUserDto) : Promise<User | undefined> {
		return this.createStandardUser(createUserDto);
	}

	@UseGuards()
	@Patch(':id')
	modifyAdminUsername(
		@Param('id') id: number,
		@Body() updateUserDto: UpdateUserDto
	) : Promise<User | undefined> {
		return this.userService.updateUserUsername(id, updateUserDto);
	}

	@UseGuards()
	@Patch(':id')
	modifyAdminPassword(
		@Param('id') id: number,
		@Body() updateUserDto: UpdateUserDto
	) : Promise <User | undefined> {
		// implement that
	}
}
