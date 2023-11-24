import { Injectable } from "@nestjs/common";
import { User } from "src/user/user.entity";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {

	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private jwtService: JwtService
	) {};

	// use to validate that a user have a valid jwt token
	async validateUserUsingJwt(payloadSub: string) : Promise<User | null> {
		const user = await this.userRepository.findOne();
		
		return null;
	}

	// use to validate a couple username/passwd, return the user if validated, null elsewhere
	async validateUserUsingLocal(username: string, password: string) : Promise<User | null> {
		const user = await this.userRepository.findOne({ where: { username } });

		if (user && this.comparePasswords(password, user.password)) {
			return user;
		}
		return null;
	}

	// to use only when having a successful verif password/login
	async login(user: User) : Promise<{ accessToken: string }> {
		const payload = {
			username: user.username, 
			userId: user.id
		}

		return { accessToken: this.jwtService.sign(payload) };
	}

	// check if the hashed password is the same as plain text provided password
	private async comparePasswords(plainTextPassword: string, hashedPassword: string) : Promise<boolean> {
		return await bcrypt.compare(plainTextPassword, hashedPassword);
	}

	// returns a hashed password from a plain text password
	async createHashedPassword(plainTextPassword: string) : Promise<string> {
		return await bcrypt.hash(plainTextPassword, 10);
	}
}
