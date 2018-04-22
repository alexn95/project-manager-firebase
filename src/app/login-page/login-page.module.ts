import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from './../../services/auth/auth.service';
import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login-page.component';
import { MatButtonModule, MatInputModule, MatCheckboxModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,

        // MATERIAL
        MatButtonModule,
        MatInputModule,
        MatCheckboxModule

    ],
    declarations: [
        LoginPageComponent
    ],
    exports: [
        LoginPageComponent
    ],
    providers: [
        AuthService
    ]
})
export class LoginPageModule {
}
