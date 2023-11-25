import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  	declarations: [
    	AppComponent
  	],
  	imports: [
    	BrowserModule,
		AppRoutingModule
  	],
  	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: false }
	],
  	bootstrap: [AppComponent]
})
export class AppModule { }
