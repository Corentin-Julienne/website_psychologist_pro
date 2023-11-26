import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from "rxjs";
import { AuthService } from "../services/admin/auth.service";

@Injectable({
	providedIn: 'root'
})
export class LoginGuard implements CanActivate {

	constructor(private authService: AuthService) {};
	
	canActivate(
		route: ActivatedRouteSnapshot, 
		state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean> | Promise<boolean> {
		
		if (!this.authService.isLogged()) {
			return true;
		}
		return false;
	}
}
