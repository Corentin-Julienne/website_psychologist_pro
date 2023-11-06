import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class ASRSService {

	private apiUrl: string = '';
	
	constructor(private http: HttpClient) {};

	
}
