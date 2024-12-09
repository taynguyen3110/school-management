import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { FormService } from '../../services/form.service';

@Component({
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AddressAutocompleteComponent,
      multi: true,
    },
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'sman-address-autocomplete',
  templateUrl: 'address-autocomplete.component.html',
})
export class AddressAutocompleteComponent
  implements OnInit, ControlValueAccessor
{
  @Input() name: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() className: string = '';
  @Input() hasError: ValidationErrors = {};
  @Input() errMsgs: { [key: string]: string } = {};

  value: string = '';
  onChange = (value: string) => {};
  onTouched = () => {};

  @ViewChild('addresstext') addresstext!: ElementRef;

  autocomplete: google.maps.places.Autocomplete | undefined;

  constructor(public formService: FormService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.addresstext.nativeElement,
      {
        componentRestrictions: { country: 'AU' },
        types: ['address'],
      }
    );
    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete!.getPlace();
      this.control.setValue(place.formatted_address);
    });
  }

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
    this.onChange(this.value); // Notify Angular of the value change
  }

  onBlur(): void {
    this.onTouched(); // Notify Angular the control is touched
  }
}
