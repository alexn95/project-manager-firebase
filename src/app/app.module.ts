import { HomeModule } from './home/home.module';
import { ProjectsModule } from './projects/projects.module';
import { SignupPageModule } from './signup-page/singup-page.module';
import { AuthGuardService } from './../services/auth-guard/auth-guard.service';
import { environment } from './../environments/environment';
import { routing } from './app.routes';

import { LoginPageModule } from './login-page/login-page.module';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from './toolbar/toolbar.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import * as firebase from 'firebase/app';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material';
import { SnackBarService } from '../services/snack-bar/snack-bar.service';
import { ProjectsComponent } from './projects/projects.component';
import { HomeComponent } from './home/home.component';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        BrowserModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        routing,
        ToolbarModule,
        LoginPageModule,
        SignupPageModule,
        ProjectsModule,
        HomeModule,

        // MATERIAL
        MatSnackBarModule
    ],
    providers: [
        AuthGuardService,
        SnackBarService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
