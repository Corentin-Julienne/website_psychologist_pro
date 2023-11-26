import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { TwoFaService } from "./two-fa.service";

@Injectable()
export class TwoFactorAuth implements CanActivate {

	constructor(private twoFaService: TwoFaService) {};
	
	canActivate(
		context: ExecutionContext
		): boolean | Promise<boolean> | Observable<boolean> {

		if (this.twoFaService.isTwoFactorAuthActivated() === true) {
			return true;	
		}
		
		const request = context.switchToHttp().getRequest();
		const user = request.user;
		const token = request.headers['2fa-token'];
		
		return this.twoFaService.isTwoFactorAuthTokenValid(token, user);
	}
}
