import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PrezRoutingModule } from "./prez-routing.module";
import { PrezViewComponent } from './prez-view/prez-view.component';
import { PrezHeaderComponent } from './prez-header/prez-header.component';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { AboutComponent } from './about/about.component';
import { PrezServicesComponent } from './prez-services/prez-services.component';
import { PrezServiceComponent } from './prez-service/prez-service.component';
import { CvProComponent } from './cv-pro/cv-pro.component';
import { CvEducComponent } from './cv-educ/cv-educ.component';

@NgModule({
	declarations: [
		PrezViewComponent,
		PrezHeaderComponent,
		AboutComponent,
		PrezServicesComponent,
		PrezServiceComponent,
		CvProComponent,
		CvEducComponent
	],
	imports: [
		CommonModule,
		PrezRoutingModule,
		SharedModule,
		CoreModule
	],
	exports: [

	]
})
export class PrezModule {

}
