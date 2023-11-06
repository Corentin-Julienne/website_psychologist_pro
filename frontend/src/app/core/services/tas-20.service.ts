import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class TAS20Service {

	private apiUrl: string = ''; // modify this

	constructor(private http: HttpClient) {};
}
