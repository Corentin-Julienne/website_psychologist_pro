import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class STAIBService {

	private apiUrl: string = ''; // modify that

	constructor(private http: HttpClient) {};
}
