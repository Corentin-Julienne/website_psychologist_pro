import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminAuthViewComponent } from "./admin-auth-view/admin-auth-view.component";
import { AdminViewComponent } from './admin-view/admin-view.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { LoginGuard } from '../../core/guards/login.guard';

const routes: Routes = [
	{
		path: '/login', component: AdminAuthViewComponent, canActivate: [LoginGuard]
	},
	{
		path: '', component: AdminViewComponent, canActivate: [AuthGuard]
	}
] 

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule {

}
