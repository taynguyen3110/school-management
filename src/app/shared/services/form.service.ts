import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormService {
  constructor() {}

  isFieldInvalid(formControl: FormControl): boolean {
    return formControl.invalid && (formControl.touched || formControl.dirty);
  }

  getFieldErrors(formControl: FormControl): ValidationErrors | null {
    return formControl.errors;
  }

  getCombinedErrors(formControl: FormControl): ValidationErrors {
    return {
      fieldInvalid: this.isFieldInvalid(formControl),
      ...this.getFieldErrors(formControl),
    } as ValidationErrors;
  }
}
