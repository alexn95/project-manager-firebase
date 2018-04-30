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
            MatSidenavModule, } from '@angular/material';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectMenuComponent } from './project-menu/project-menu.component';

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
    ],
    declarations: [
        ProjectComponent,
        ProjectDetailsComponent,
        ProjectMenuComponent,
        ProjectUsersComponent,
    ],
    exports: [
        ProjectComponent,
        ProjectDetailsComponent,
        ProjectMenuComponent,
        ProjectUsersComponent,
    ],
    providers: [
        ProjectService
    ],
    entryComponents: [
        DeleteComponent
    ]
})
export class ProjectModule {
}
