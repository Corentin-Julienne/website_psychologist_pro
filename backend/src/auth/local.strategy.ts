import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { User } from "src/user/user.entity";
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {

	constructor(private authService: AuthService) {
		super({
			usernameField: 'username', 
			passwordField: 'password'
		});  
	};

	async validate(username: string, password: string) : Promise<User> {
		const user = await this.authService.validateUserUsingLocal(username, password);

		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
