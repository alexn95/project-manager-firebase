import { ProjectComponent } from './project/project.component';
import { HomeComponent } from './home/home.component';
import { routingUrl } from './../environments/const-variables';
import { ProjectsComponent } from './projects/projects.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { AuthGuardService } from './../services/auth-guard/auth-guard.service';
import { environment } from './../environments/environment';
import { LoginPageComponent } from './login-page/login-page.component';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar.component';



const routes: Routes = [
    {
        path: routingUrl.home,
        component: HomeComponent
    },
    {
        path: routingUrl.project,
        component: ProjectComponent,
        canActivate: [AuthGuardService],
    },
    {
        path: routingUrl.projects,
        component: ProjectsComponent,
        canActivate: [AuthGuardService],
    },
    {
        path: routingUrl.signupPage,
        component: SignupPageComponent
    },
    {
        path: routingUrl.loginPage,
        component: LoginPageComponent
    },

];

export const approutingProviders: any[] = [];
export const routing = RouterModule.forRoot(routes);
