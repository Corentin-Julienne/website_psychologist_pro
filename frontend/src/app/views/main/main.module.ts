import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainViewComponent } from "./main-view/main-view.component";
import { MainRoutingModule } from './main-routing.module';

@NgModule({
	declarations: [
		MainViewComponent
	],
	imports: [
		CommonModule,
		MainRoutingModule
	],
	exports: [

	]
})
export class MainModule {

}
