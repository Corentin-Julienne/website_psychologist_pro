import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminViewComponent } from './admin-view/admin-view.component';
import { AdminAuthViewComponent } from './admin-auth-view/admin-auth-view.component';
import { SecurityViewComponent } from './security-view/security-view.component';

@NgModule({
	declarations: [
    	AdminViewComponent,
     	AdminAuthViewComponent,
     	SecurityViewComponent
 	],
	imports: [
		CommonModule,
		AdminRoutingModule
	],
	exports: []
})
export class AdminModule {

}
