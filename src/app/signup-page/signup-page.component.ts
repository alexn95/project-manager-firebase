import { AuthService } from './../../services/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormErrorStateMatcher } from './../../models/form-error-state-matcher';
import { Component, OnInit } from '@angular/core';
import { confirmPasswordValidator } from '../../models/confirm-password-validator';

@Component({
    selector: 'app-signup-page',
    templateUrl: './signup-page.component.html'
})
export class SignupPageComponent implements OnInit {

    public errorMatcher = new FormErrorStateMatcher();
    public email: FormControl;
    public firstName: FormControl;
    public lastName: FormControl;
    public password: FormControl;
    public passwordConfirm: FormControl;
    public signupForm: FormGroup;

    public isDisableSubmit = false;

    constructor(
        public authSrervice: AuthService
    ) {
        this.email = new FormControl('', [
            Validators.required,
            Validators.email,
            Validators.maxLength(100)
        ]);
        this.firstName = new FormControl('', [
            Validators.required,
            Validators.maxLength(50)
        ]);
        this.lastName = new FormControl('', [
            Validators.required,
            Validators.maxLength(50)
        ]);
        this.password = new FormControl('', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50)
        ]);
        this.passwordConfirm = new FormControl('', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
            confirmPasswordValidator(this.password)
        ]);
        this.signupForm = new FormGroup({
            emial: this.email,
            password: this.password,
            passwordConfirm: this.passwordConfirm,
            firstName: this.firstName,
            lastName: this.lastName,
        });

    }

    ngOnInit() {
    }

    public signup(): void {
        this.isDisableSubmit = true;
        this.authSrervice.signup(this.email.value, this.password.value, this.firstName.value, this.lastName.value)
            .subscribe(() => this.isDisableSubmit = false);
    }

}
