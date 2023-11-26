import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, LoginCredentials } from '../../../core/services/admin/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  	selector: 'app-admin-auth-view',
  	templateUrl: './admin-auth-view.component.html',
  	styleUrls: ['./admin-auth-view.component.css']
})
export class AdminAuthViewComponent implements OnInit, OnDestroy {

	loginForm!: FormGroup;
	subscription!: Subscription;

	formSubmitted: boolean = false;

	constructor(private formBuilder: FormBuilder,
				private authService: AuthService,
				private router: Router) {}
	
	ngOnInit(): void {
		this.loginForm = this.formBuilder.group({
			username: ['', [Validators.required]],
      		password: ['', [Validators.required]]
		})
	}

	onSubmit() : void {
		this.formSubmitted = true;

		if (this.loginForm.valid) {
			const loginCredentials: LoginCredentials = {
				username: this.loginForm.get('username')?.value,
				password: this.loginForm.get('password')?.value
			}
			this.subscription = this.authService.login(loginCredentials).subscribe(
				data => {
					this.redirectionToControlPanel();
				},
				error => {
					// Handle login error
			});
		}
	}

	private redirectionToControlPanel() : void {
		this.router.navigate(['/admin']);
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}		
	}
}
