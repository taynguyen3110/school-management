import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMismatchValidator(
  password: string,
  confirmPassword: string,
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const passwordControl = formGroup.get(password);
    const confirmPasswordControl = formGroup.get(confirmPassword);

    if (!passwordControl!.value || !confirmPasswordControl!.value) {
      return null;
    }

    const match = passwordControl!.value === confirmPasswordControl!.value;

    return !match ? { passwordMismatch: true } : null;
  };
}
