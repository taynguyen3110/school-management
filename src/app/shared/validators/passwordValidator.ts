import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const hasNumeric = /[0-9]+/.test(value);

        const passwordValid = hasNumeric;

        return !passwordValid ? { passwordInvalid: true } : null;
    }
}