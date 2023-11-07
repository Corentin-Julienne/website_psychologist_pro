import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
	{
		path: '', loadChildren: 
		() => import('./views/main/main.module').then(m => m.MainModule)
	},
	{
		path: 'about', loadChildren:
		() => import('./views/prez/prez.module').then(m => m.PrezModule)
	},
	{
		path: 'services', loadChildren:
		() => import('./views/services/services.module').then(m => m.ServicesModule)
	},
	{
		path: 'infos', loadChildren:
		() => import('./views/infos/infos.module').then(m => m.InfosModule)
	},
	{
		path: 'admin', loadChildren:
		() => import('./views/admin/admin.module').then(m => m.AdminModule),
		canActivate: [AuthGuard]
	}
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {

}
