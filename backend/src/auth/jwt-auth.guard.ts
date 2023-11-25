import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

	override canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		return super.canActivate(context);
	}

	override handleRequest(err: any, user: any, info: any, context: ExecutionContext): any {
		if (err || !user) {
			throw err || new UnauthorizedException();
		}
		return user;
	}
}
