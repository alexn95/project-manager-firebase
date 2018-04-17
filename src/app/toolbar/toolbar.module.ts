import { ServicesModule } from './../../services/services.module';
import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar.component';
import { DataProviderService } from '../../services/data-provider/data-provider.service';
import { MatToolbarModule, MatButtonModule } from '@angular/material';

@NgModule({
    imports: [
        ServicesModule,
        MatButtonModule,
        MatToolbarModule
    ],
    declarations: [
        ToolbarComponent
    ],
    exports: [
        ToolbarComponent
    ],
    providers: [
        DataProviderService
    ]
})
export class ToolbarModule {
}
