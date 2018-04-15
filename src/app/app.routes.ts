import { AuthGuardService } from './../services/auth-guard/auth-guard.service';
import { environment } from './../environments/environment';
import { LoginPageComponent } from './login-page/login-page.component';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar.component';



const routes: Routes = [
    {
        path: environment.routing.toolbar,
        component: ToolbarComponent,
        canActivate: [AuthGuardService],
    },
    {
        path: environment.routing.loginPage,
        component: LoginPageComponent
    },

];

export const appRoutingProviders: any[] = [];
export const routing = RouterModule.forRoot(routes);
