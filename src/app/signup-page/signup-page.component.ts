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
    public password: FormControl;
    public passwordConfirm: FormControl;
    public signupForm: FormGroup;

    constructor(
        public authSrervice: AuthService
    ) {
        this.email = new FormControl('', [
            Validators.required,
            Validators.email
        ]);
        this.password = new FormControl('', [
            Validators.required,
            Validators.minLength(6)
        ]);
        this.passwordConfirm = new FormControl('', [
            Validators.required,
            Validators.minLength(6),
            confirmPasswordValidator(this.password)
        ]);
        this.signupForm = new FormGroup({
            emial: this.email,
            password: this.password,
            passwordConfirm: this.passwordConfirm
        });

    }

    ngOnInit() {
    }

    public signup(): void {
        this.authSrervice.signup(this.email.value, this.password.value);
    }

}
