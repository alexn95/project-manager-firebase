import { AbstractControl, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(pass: AbstractControl): ValidatorFn {
    return (passwordConfirm: AbstractControl): { [key: string]: any } => {
        const isValid = (pass.value === passwordConfirm.value);
        return isValid ? null : { 'confirmPassword': { value: passwordConfirm.value } };
    };
}
