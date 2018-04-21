import { ServicesModule } from './../../services/services.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataProviderService } from '../../services/data-provider/data-provider.service';
import { MatToolbarModule, MatButtonModule, MatCardModule } from '@angular/material';
import { ProjectsComponent } from './projects.component';

@NgModule({
    imports: [
        BrowserModule,
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
