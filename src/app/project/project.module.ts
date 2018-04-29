import { ServicesModule } from './../../services/services.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectComponent } from './project.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatCardModule, MatInputModule, MatCheckboxModule } from '@angular/material';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        RouterModule,
        ServicesModule,

        // MATERIAL
        MatButtonModule,
        MatInputModule,
        MatCheckboxModule
    ],
    declarations: [
        ProjectComponent
    ],
    exports: [
        ProjectComponent
    ],
    providers: [
    ]
})
export class ProjectModule {
}
