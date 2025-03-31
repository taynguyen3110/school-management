import { CommonModule } from '@angular/common';
import {
  provideNativeDateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  DateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Component, Input, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { MY_DATE_FORMATS } from './dateFormat';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

@Component({
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: DateInputComponent,
            multi: true,
        },
        {
            provide: MAT_DATE_FORMATS,
            useValue: MY_DATE_FORMATS,
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
    selector: 'sman-date-input',
    templateUrl: 'date-input.component.html'
})
export class DateInputComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = '';
  @Input() className: string = '';
  @Input() name: string = '';
  @Input() hasError: ValidationErrors = {};
  @Input() errMsgs: { [key: string]: string } = {};

  today = new Date();
  maxDate = new Date(this.today.getFullYear() - 10, 0, 15);

  dateControl = new FormControl();
  onChange = (value: string) => {};
  onTouched = () => {};

  constructor(public formService: FormService) {}

  ngOnInit() {
    this.dateControl.valueChanges.subscribe((value) => {
      this.onChange(value);
    });
  }

  ngAfterViewInit() {}

  get errorKeys() {
    return Object.keys(this.hasError);
  }

  writeValue(value: any): void {
    this.dateControl.setValue(value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}

  onBlur(): void {
    this.onTouched();
  }
}
