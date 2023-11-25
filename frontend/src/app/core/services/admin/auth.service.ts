import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export interface LoginCredentials {
	username: string;
  	password: string;
}

export interface LoginResponse {
	accessToken: string
	// complete that
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private apiUrl: string = ''; // modify this

	constructor(private http: HttpClient) {};

	login(credentials: LoginCredentials) : Observable<LoginResponse> {
		return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
			tap(tokens => this.storeTokens(tokens))
		);
	}

	private storeTokens(tokens: LoginResponse) {
		localStorage.setItem('jwt_token', tokens.accessToken);
	}

	isLogged() : boolean {
		return !!localStorage.getItem('jwt_token');
	}
}
