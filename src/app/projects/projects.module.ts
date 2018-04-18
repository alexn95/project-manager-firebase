import { NgModule } from '@angular/core';
import { DataProviderService } from '../../services/data-provider/data-provider.service';
import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { ProjectsComponent } from './projects.component';

@NgModule({
    imports: [
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
