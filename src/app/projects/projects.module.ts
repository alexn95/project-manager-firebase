import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatCardModule } from '@angular/material';
import { ProjectsComponent } from './projects.component';
import { RouterModule, Routes } from '@angular/router';
import { ServicesModule } from '../../services/services.module';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        ServicesModule,

        // MATERIAL
        MatButtonModule,
        MatCardModule
    ],
    declarations: [
        ProjectsComponent
    ],
    exports: [
        ProjectsComponent
    ],
    providers: [
    ]
})
export class ProjectsModule {
}
