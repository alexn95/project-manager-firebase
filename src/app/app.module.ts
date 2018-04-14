import { environment } from './environment';
import { LoginPageModule } from './login-page/login-page.module';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from './toolbar/toolbar.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { AppComponent } from './app.component';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        ToolbarModule,
        LoginPageModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
