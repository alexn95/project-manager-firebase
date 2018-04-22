import { SignupPageComponent } from './signup-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from './../../services/auth/auth.service';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,

        // MATERIAL
        MatButtonModule,
        MatInputModule

    ],
    declarations: [
        SignupPageComponent
    ],
    exports: [
        SignupPageComponent
    ],
    providers: [
        AuthService
    ]
})
export class SignupPageModule {
}
