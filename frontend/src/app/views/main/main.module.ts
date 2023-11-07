import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainViewComponent } from "./main-view/main-view.component";
import { MainRoutingModule } from './main-routing.module';
import { MainHeaderComponent } from './main-header/main-header.component';
import { HeroComponent } from './hero/hero.component';
import { ServicesComponent } from './services/services.component';
import { ServiceComponent } from './service/service.component';
import { InfosComponent } from './infos/infos.component';
import { ContactComponent } from './contact/contact.component';
import { InfoCardsComponent } from './info-cards/info-cards.component';
import { InfoCardComponent } from './info-card/info-card.component';

@NgModule({
	declarations: [
		MainViewComponent,
		MainHeaderComponent,
		HeroComponent,
		ServicesComponent,
		ServiceComponent,
		InfosComponent,
		ContactComponent,
		InfoCardsComponent,
		InfoCardComponent
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
