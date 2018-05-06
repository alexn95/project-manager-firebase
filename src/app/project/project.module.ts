import { ProjectInviteUsersComponent } from './project-users-invite/project-invite-users.comonent';
import { ProjectUsersComponent } from './project-users/project-users.component';
import { DeleteComponent } from './../delete/delete.component';
import { ProjectService } from './project.service';
import { ServicesModule } from './../../services/services.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { ProjectComponent } from './project.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef } from '@angular/core';
import {    MatToolbarModule, MatButtonModule, MatInputModule, MatCheckboxModule,
            MatSelectModule,
            MatSidenavModule,
            MatSortModule,
            MatTableModule,
            MatIconModule,
            MatProgressSpinnerModule,
            MatTooltipModule, } from '@angular/material';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectMenuComponent } from './project-menu/project-menu.component';
import { DataUsersService } from '../../services/data-provider/data-users.service';
import { hasUserValidator } from '../../services/validators/has-user-validator';

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
        MatProgressSpinnerModule,
        MatTooltipModule,
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
        {
            provide: NG_ASYNC_VALIDATORS,
            useExisting: forwardRef(() => hasUserValidator), multi: true
        },
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
