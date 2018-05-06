import { routingUrl } from './../../environments/const-variables/routing-url';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { FormErrorStateMatcher } from '../../services/validators/form-error-state-matcher';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {

    public errorMatcher = new FormErrorStateMatcher();
    public email: FormControl;
    public password: FormControl;
    public rememberMe: FormControl;
    public loginForm: FormGroup;

    constructor(
        public authSrervice: AuthService,
        public router: Router
    ) {
        authSrervice.logout();

        this.email = new FormControl('', [
            Validators.required,
            Validators.email
        ]);
        this.password = new FormControl('', [
            Validators.required,
            Validators.minLength(6)
        ]);
        this.rememberMe = new FormControl(true);
        this.loginForm = new FormGroup({
            email: this.email,
            password: this.password,
            rememberMe: this.rememberMe
        });
    }

    public ngOnInit(): void {
    }

    public signup(): void {
        this.router.navigateByUrl(routingUrl.signupPage);
    }

    public login(): void {
        this.authSrervice.login(
            this.email.value,
            this.password.value,
            this.rememberMe.value ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION);
    }

}
