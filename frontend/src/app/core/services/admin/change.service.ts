import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface ChangePasswdCredentials {
	username: string;
	password_old: string;
	password_new: string;
}

@Injectable({
	providedIn: 'root'
})
export class RegisterService {

	private apiUrl: string = ''; // modify that
	
	constructor(private http: HttpClient) {};

	changePassword(changePasswdCredentials : ChangePasswdCredentials) : Observable<any> { // modify
		return this.http.patch<any>(this.apiUrl, changePasswdCredentials);
	}

	changeUsername(changePasswdCredentials : ChangePasswdCredentials) : Observable<any> { // modify
		return this.http.patch<any>(this.apiUrl, changePasswdCredentials);
	}
}
