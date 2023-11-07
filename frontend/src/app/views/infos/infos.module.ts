import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FeesComponent } from './fees/fees.component';
import { ServicesComponent } from './services/services.component';
import { ServiceComponent } from './service/service.component';
import { ContactComponent } from './contact/contact.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { InfosHeaderComponent } from './infos-header/infos-header.component';
import { InfosViewComponent } from './infos-view/infos-view.component';

@NgModule({
	declarations: [
		InfosViewComponent,
		InfosHeaderComponent,
		FeesComponent,
		ServicesComponent,
		ServiceComponent,
		ContactComponent,
		ContactInfoComponent,
		ContactFormComponent,
  		InfosHeaderComponent,
  		InfosViewComponent
	],
	imports: [
		CommonModule,
		CoreModule,
		SharedModule
	],
	exports: []
})
export class InfosModule {

}
