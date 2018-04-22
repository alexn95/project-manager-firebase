import { ProjectComponent } from './project.component';
import { DataProviderService } from './../../services/data-provider/data-provider.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatCardModule } from '@angular/material';

@NgModule({
    imports: [
        BrowserModule,

        // MATERIAL
        MatButtonModule,
        MatCardModule
    ],
    declarations: [
        ProjectComponent
    ],
    exports: [
        ProjectComponent
    ],
    providers: [
        DataProviderService,
    ]
})
export class ProjectModule {
}
