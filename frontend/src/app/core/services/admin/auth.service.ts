import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface LoginCredentials {
	username: string;
  	password: string;
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private apiUrl: string = ''; // modify this

	constructor(private http: HttpClient) {};

	login(credentials: LoginCredentials) : Observable<any> { // modify this
		return this.http.post<any>(this.apiUrl, credentials);
	}

	isLogged() : boolean { // modify this
		return false;
	}
}
