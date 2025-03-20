import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Import showcase components
import { ButtonComponent } from '../components/button/button.component';
import { InputComponent } from '../components/input/input.component';
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component';
import { ProfilePhotoComponent } from '../components/profile-photo/profile-photo.component';
import { PageLayoutComponent } from '../components/page-layout/page-layout.component';
import { ItemTableComponent } from '../components/item-table/item-table.component';
import { DateInputComponent } from '../components/date-input/date-input.component';
import { MultiSelectorComponent } from '../components/multiselector/multiselector.component';
import { InformationWrapperComponent } from '../components/information-wrapper/information-wrapper.component';
import { AddressAutocompleteComponent } from '../components/address-autocomplete/address-autocomplete.component';

// Import component documentation
import { ComponentDoc, COMPONENT_DOCS } from './component-docs';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-components-showcase',
  templateUrl: './components-showcase.component.html',
  styleUrls: ['./components-showcase.component.scss'],
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    LoadingSpinnerComponent,
    ProfilePhotoComponent,
    PageLayoutComponent,
    ItemTableComponent,
    DateInputComponent,
    MultiSelectorComponent,
    InformationWrapperComponent,
    AddressAutocompleteComponent
  ],
  standalone: true,
})
export class ComponentsShowcaseComponent implements OnInit {
  components = COMPONENT_DOCS;
  categories = ['Core', 'Form', 'Layout', 'Data Display', 'Utility'];
  selectedTabIndex = 0;
  form: FormGroup;

  // Dummy data for components
  readonly tableItems = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      gender: 'male',
      admissionDate: new Date(),
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      gender: 'female',
      admissionDate: new Date(),
    },
    {
      id: 3,
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike@example.com',
      gender: 'male',
      admissionDate: new Date(),
    },
  ];

  readonly multiselectorItems = [
    { id: '1', label: 'Mathematics' },
    { id: '2', label: 'Physics' },
    { id: '3', label: 'Chemistry' },
    { id: '4', label: 'Biology' },
    { id: '5', label: 'Computer Science' },
  ];

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    public formService: FormService
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      birthDate: ['', [Validators.required]],
      subjects: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  get username() {
    return this.form.get('username') as FormControl;
  }

  get birthDate() {
    return this.form.get('birthDate') as FormControl;
  }

  get subjects() {
    return this.form.get('subjects') as FormControl;
  }

  get address() {
    return this.form.get('address') as FormControl;
  }

  // Helper method to check if field has errors
  hasFieldError(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  getComponentsByCategory(category: string): ComponentDoc[] {
    return this.components.filter((c) => c.category === category);
  }
}
