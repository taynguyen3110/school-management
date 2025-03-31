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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AddressAutocompleteComponent,
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  selector: 'sman-address-autocomplete',
  templateUrl: 'address-autocomplete.component.html',
})
export class AddressAutocompleteComponent
  implements OnInit, ControlValueAccessor
{
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() className: string = '';
  @Input() placeholder: string = '';
  @Input() hasError: ValidationErrors = {};
  @Input() errMsgs: { [key: string]: string } = {};

  value: string = '';
  onChange = (value: string) => {};
  onTouched = () => {};

  @ViewChild('addresstext') addresstext!: ElementRef;

  autocomplete: google.maps.places.Autocomplete | undefined;

  isLoading: boolean = false;

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

    this.addresstext.nativeElement.addEventListener('input', () => {
      if (this.value) {
        this.isLoading = true;
      }
    });

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete!.getPlace();
      this.onChange(place.formatted_address!);
    });

    // Use MutationObserver to detect when suggestions are rendered
    const observer = new MutationObserver(() => {
      const suggestionPanel = document.querySelector('.pac-container');
      if (suggestionPanel && suggestionPanel.children.length > 0) {
        this.isLoading = false;
      }
    });

    // Start observing the suggestion panel
    setTimeout(() => {
      const suggestionPanel = document.querySelector('.pac-container');
      if (suggestionPanel) {
        observer.observe(suggestionPanel, { childList: true, subtree: true });
      }
    }, 500);
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
    this.onChange(this.value);

    if (!inputValue) {
      this.isLoading = false;
    }
  }

  onBlur(): void {
    this.onTouched();
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
  }
}
