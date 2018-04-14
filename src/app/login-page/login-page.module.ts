import { AuthService } from './../../services/auth/auth.service';
import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login-page.component';

@NgModule({
    imports: [
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
