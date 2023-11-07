import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PrezViewComponent } from './prez-view/prez-view.component';

const routes: Routes = [
	{
		path: '', component: PrezViewComponent
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PrezRoutingModule {

}
