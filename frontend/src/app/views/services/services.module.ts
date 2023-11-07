import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ServicesRoutingModule } from './services-routing.module';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { ServicesViewComponent } from './services-view/services-view.component';
import { ServicesHeaderComponent } from './services-header/services-header.component';
import { ServicesComponent } from './services/services.component';
import { ServiceComponent } from './service/service.component';
import { PreFooterComponent } from "./pre-footer/pre-footer.component";
import { OnlineTherapyComponent } from './online-therapy/online-therapy.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
	declarations: [
		ServicesViewComponent,
		ServicesHeaderComponent,
		ServicesComponent,
		ServiceComponent,
		PreFooterComponent,
		OnlineTherapyComponent,
		ContactComponent
	],
	imports: [
		CommonModule,
		ServicesRoutingModule,
		CoreModule,
		SharedModule
	],
	exports: [

	]
})
export class ServicesModule {

}
