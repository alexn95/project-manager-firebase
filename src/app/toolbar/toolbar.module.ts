import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar.component';
import { DataProviderService } from '../../services/data-provider/data-provider.service';

@NgModule({
    imports: [
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
