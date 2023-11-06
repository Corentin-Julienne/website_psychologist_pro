import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
	{
		path: '', loadChildren: 
		() => import('./views/main/main.module').then(m => m.MainModule)
	},
	{
		path: 'admin', loadChildren:
		() => import('./views/admin/admin.module').then(m => m.AdminModule)
	}
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {

}
