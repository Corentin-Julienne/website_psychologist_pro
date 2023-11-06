import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminViewComponent } from './admin-view/admin-view.component';

@NgModule({
	declarations: [
    	AdminViewComponent
 	],
	imports: [
		CommonModule,
		AdminRoutingModule
	],
	exports: []
})
export class AdminModule {

}
