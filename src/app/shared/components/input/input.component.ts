import { CommonModule } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormService } from '../../services/form.service';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';

@Component({
  providers: [
    provideNativeDateAdapter(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
  ],
  selector: 'sman-input',
  templateUrl: 'input.component.html',
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = '';
  @Input() className: string = '';
  @Input() name: string = '';
  @Input() type: string = 'text';
  @Input() placeholder?: string = '';
  @Input() hasError: ValidationErrors = {};
  @Input() errMsgs: { [key: string]: string } = {};

  value: string = '';
  onChange = (value: string) => {};
  onTouched = () => {};

  constructor(public formService: FormService) {}

  ngOnInit() {}

  ngAfterViewInit() {}

  get errorKeys() {
    return Object.keys(this.hasError);
  }

  writeValue(obj: string): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}

  onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.value = inputValue;
    this.onChange(this.value);
    console.log(this.hasError);
    console.log(this.errorKeys);
    console.log(this.errMsgs);
  }

  onBlur(): void {
    this.onTouched();
  }
}
