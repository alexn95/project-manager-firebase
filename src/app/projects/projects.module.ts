import { ProjectCreateComponent } from './project-create/project-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatCardModule, MatInputModule } from '@angular/material';
import { ProjectsComponent } from './projects.component';
import { RouterModule, Routes } from '@angular/router';
import { ServicesModule } from '../../services/services.module';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        ServicesModule,
        FormsModule,
        MatInputModule,
        ReactiveFormsModule,

        // MATERIAL
        MatButtonModule,
        MatCardModule,
    ],
    declarations: [
        ProjectsComponent,
        ProjectCreateComponent
    ],
    exports: [
        ProjectsComponent
    ],
    providers: [
    ],
    entryComponents: [
        ProjectCreateComponent
    ]
})
export class ProjectsModule {
}
