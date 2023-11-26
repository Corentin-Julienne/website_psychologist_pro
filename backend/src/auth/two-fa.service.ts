import { Injectable } from "@nestjs/common";
import { User } from "src/user/user.entity";
import * as speakeasy from 'speakeasy';

@Injectable()
export class TwoFaService {

	constructor() {};

	enableTwoFactorAuth() : void {
		// TODO
	}

	changeTwoFactorAuth() : void {
		// TODO
	}

	isTwoFactorAuthTokenValid(token: string, user: User) : boolean {
		return speakeasy.totp.verify({
			secret: user.two_fa_key,
			encoding: 'base32',
			token: token
		});
	}

	isTwoFactorAuthActivated() : boolean {
		return true; // change that
	}
}
