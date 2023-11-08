import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { AuthService } from '../services/admin/auth.service';
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(private authService: AuthService, private router: Router) {};

	canActivate(
		route: ActivatedRouteSnapshot, 
		state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

		if (this.authService.isLogged()) {
			return true;
		} else {
			// redirecting to login admin
			this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } }); // test this
			return false;
		}
	}
}
