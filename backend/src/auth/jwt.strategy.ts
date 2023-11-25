import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from "./auth.service";
import { User } from "src/user/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

	constructor(private authService: AuthService) {
		super ({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false, // change that in prod
			secretOrKey: process.env.JWT_TOKEN
		})
	};

	async validate(payload: any) : Promise<User> {
		const user = await this.authService.validateUserUsingJwt(payload.sub);

		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
