import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class STAIAService {

	private apiUrl: string = ''; // modify this

	constructor(private http: HttpClient) {};
}
