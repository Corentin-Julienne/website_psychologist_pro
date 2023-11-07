import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class RAADSService {

	private apiUrl: string = ''; // update this

	constructor(private http: HttpClient) {};
}
