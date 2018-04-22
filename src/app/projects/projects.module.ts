import { DataProviderService } from './../../services/data-provider/data-provider.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatCardModule } from '@angular/material';
import { ProjectsComponent } from './projects.component';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,

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
        DataProviderService,
    ]
})
export class ProjectsModule {
}
