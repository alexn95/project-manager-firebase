import { DataProviderService } from './data-provider/data-provider.service';
import { AuthService } from './auth/auth.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        AngularFireDatabaseModule
    ],
    providers: [
        AuthService,
        DataProviderService
    ]
})
export class ServicesModule {
}
