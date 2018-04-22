import { DataProviderService } from './data-provider/data-provider.service';
import { AuthService } from './auth/auth.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SnackBarService } from './snack-bar/snack-bar.service';

@NgModule({
    imports: [
        AngularFireDatabaseModule,
        HttpModule
    ],
    providers: [
        AuthService,
        DataProviderService,
        SnackBarService,
    ]
})
export class ServicesModule {
}
