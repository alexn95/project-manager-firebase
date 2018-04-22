import { GlobalErrorHandler } from './../services/error-handler/error-handler.service';
import { ServicesModule } from './../services/services.module';
import { ProjectModule } from './project/project.module';
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
import { NgModule, ErrorHandler } from '@angular/core';
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
import { ProjectComponent } from './project/project.component';


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

        ServicesModule,
        ToolbarModule,
        LoginPageModule,
        SignupPageModule,
        ProjectsModule,
        HomeModule,
        ProjectModule,

        // MATERIAL
        MatSnackBarModule
    ],
    providers: [
        AuthGuardService,
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
