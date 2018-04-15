import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { FormErrorStateMatcher } from './../../models/form-error-state-matcher';
import { AuthService } from './../../services/auth/auth.service';
import { DataProviderService } from './../../services/data-provider/data-provider.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {

    private passTooltip = 'pass is required';
    private loginTooltip = 'login is required';
    private errorMatcher = new FormErrorStateMatcher();

    private email: FormControl;
    private password: FormControl;
    private loginForm: FormGroup;

    constructor(
        public authSrervice: AuthService
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
        this.loginForm = new FormGroup({
            login: this.email,
            password: this.password
        });
    }

    public ngOnInit(): void {
    }

    public signup(): void {
    }

    public login(): void {
        this.authSrervice.login(this.email.value, this.password.value);
    }

}
