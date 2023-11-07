import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InfosViewComponent } from "./infos-view/infos-view.component";

const routes: Routes = [
	{
		path: '', component: InfosViewComponent
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class InfosRoutingModule {

}
