import { ProjectUsersComponent } from './project/project-users/project-users.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';
import { ProjectComponent } from './project/project.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { AuthGuardService } from './../services/auth-guard/auth-guard.service';
import { environment } from './../environments/environment';
import { LoginPageComponent } from './login-page/login-page.component';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AgileBoardsComponent } from './agile-boards/agile-boards.component';
import { routingUrl } from '../models/const-variables/routing-url';



const routes: Routes = [
    {
        path: '',
        redirectTo: routingUrl.home,
        pathMatch: 'full'
    },
    {
        path: routingUrl.home,
        component: HomeComponent
    },
    {
        path: routingUrl.projects,
        component: ProjectsComponent,
        canActivate: [AuthGuardService],
    },
    {
        path: routingUrl.projects + routingUrl.projectId,
        component: ProjectComponent,
        canActivate: [AuthGuardService],
        children : [
            {
                outlet: routingUrl.contentOutlet,
                path: '',
                component: ProjectDetailsComponent
            },
            {
                outlet: routingUrl.contentOutlet,
                path: routingUrl.contentDetails,
                component: ProjectDetailsComponent
            },
            {
                outlet: routingUrl.contentOutlet,
                path: routingUrl.contentUsers,
                component: ProjectUsersComponent,
            }
        ]
    },
    {
        path: routingUrl.agileBoards,
        component: AgileBoardsComponent,
        canActivate: [AuthGuardService],
    },
    {
        path: routingUrl.agileBoards + routingUrl.projectId,
        component: AgileBoardsComponent,
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
