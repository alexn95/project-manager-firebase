import { ServicesModule } from './../../services/services.module';
import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar.component';
import { DataProviderService } from '../../services/data-provider/data-provider.service';

@NgModule({
    imports: [
        ServicesModule
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
