import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: {expiresIn: '60m'}
		})
	],
	providers: [
		AuthService
	],
	exports: [
		AuthService,
		JwtStrategy
	]
})
export class AuthModule {

}
