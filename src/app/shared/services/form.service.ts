import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormService {
  constructor() {}

  isFieldInvalid(formControl: FormControl) {
    return formControl.invalid && (formControl.touched || formControl.dirty);
  }
}
