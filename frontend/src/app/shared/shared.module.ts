import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from './header/header.component';
import { CreditsFooterComponent } from './footer/credits-footer/credits-footer.component';
import { InfosFooterComponent } from './footer/infos-footer/infos-footer.component';
import { FooterComponent } from './footer/footer/footer.component';

@NgModule({
	declarations: [
    	HeaderComponent,
       	CreditsFooterComponent,
       	InfosFooterComponent,
        FooterComponent
  	],
	imports: [
		CommonModule
	],
	exports: [

	]
})
export class SharedModule {

}
