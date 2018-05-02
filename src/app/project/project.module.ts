import { ProjectInviteUsersComponent } from './project-users-invite/project-invite-users.comonent';
import { ProjectUsersComponent } from './project-users/project-users.component';
import { DeleteComponent } from './../delete/delete.component';
import { ProjectService } from './project.service';
import { ServicesModule } from './../../services/services.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectComponent } from './project.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {    MatToolbarModule, MatButtonModule, MatInputModule, MatCheckboxModule,
            MatSelectModule,
            MatSidenavModule,
            MatSortModule,
            MatTableModule,
            MatIconModule, } from '@angular/material';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectMenuComponent } from './project-menu/project-menu.component';
import { DataUsersService } from '../../services/data-provider/data-users.service';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        RouterModule,
        ServicesModule,

        // MATERIAL
        MatButtonModule,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule,
        MatCheckboxModule,
        MatIconModule,
    ],
    declarations: [
        ProjectComponent,
        ProjectDetailsComponent,
        ProjectMenuComponent,
        ProjectUsersComponent,
        ProjectInviteUsersComponent,
    ],
    exports: [
        ProjectComponent,
        ProjectDetailsComponent,
        ProjectMenuComponent,
        ProjectUsersComponent,
        ProjectInviteUsersComponent,
    ],
    providers: [
        ProjectService,
        DataUsersService
    ],
    entryComponents: [
        DeleteComponent,
        ProjectInviteUsersComponent
    ]
})
export class ProjectModule {
}
