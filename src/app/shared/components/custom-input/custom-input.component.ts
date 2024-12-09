import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomInputComponent,
      multi: true,
    },
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  selector: 'sman-custom-input',
  templateUrl: 'custom-input.component.html',
})
export class CustomInputComponent implements OnInit, ControlValueAccessor {
  @Input() hasError: boolean = false;
  @Input() name: string = '';
  @Input() type: string = 'text';
  @Input() placeholder?: string = '';

  value: string = '';
  onChange = (value: string) => {};
  onTouched = () => {};

  constructor() {}

  ngOnInit() {}

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
    this.onChange(this.value); // Notify Angular of the value change
  }

  onBlur(): void {
    this.onTouched(); // Notify Angular the control is touched
  }
}
