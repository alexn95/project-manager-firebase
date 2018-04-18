import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { DataProviderService } from '../../services/data-provider/data-provider.service';
import { MatToolbarModule, MatButtonModule } from '@angular/material';

@NgModule({
    imports: [
    ],
    declarations: [
        HomeComponent
    ],
    exports: [
        HomeComponent
    ],
    providers: [
    ]
})
export class HomeModule {
}
