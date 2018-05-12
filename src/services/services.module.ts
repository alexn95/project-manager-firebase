import { DataIssuesService } from './data-provider/data-issues.service';
import { DataProjectsService } from './data-provider/data-projects.service';
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
        DataIssuesService,
        AuthService,
        DataProviderService,
        DataProjectsService,
        SnackBarService,
    ]
})
export class ServicesModule {
}
