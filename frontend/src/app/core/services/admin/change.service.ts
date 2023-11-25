import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface ChangePasswdCredentials {
	username: string;
	password_old: string;
	password_new: string;
}

export interface ChangePasswdResponse {
	// fulfill that
}

@Injectable({
	providedIn: 'root'
})
export class RegisterService {

	private apiUrl: string = ''; // modify that
	
	constructor(private http: HttpClient) {};

	changePassword(changePasswdCredentials : ChangePasswdCredentials) : Observable<ChangePasswdResponse> {
		return this.http.patch<ChangePasswdResponse>(this.apiUrl, changePasswdCredentials);
	}

	changeUsername(changePasswdCredentials : ChangePasswdCredentials) : Observable<ChangePasswdResponse> {
		return this.http.patch<ChangePasswdResponse>(this.apiUrl, changePasswdCredentials);
	}
}
