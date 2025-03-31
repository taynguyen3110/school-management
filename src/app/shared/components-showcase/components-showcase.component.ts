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
import { Params } from '@angular/router';

// Import showcase components
import { ButtonComponent } from '../components/button/button.component';
import { InputComponent } from '../components/input/input.component';
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component';
import { ProfilePhotoComponent } from '../components/profile-photo/profile-photo.component';
import { ItemTableComponent } from '../components/item-table/item-table.component';
import { DateInputComponent } from '../components/date-input/date-input.component';
import { MultiSelectorComponent } from '../components/multiselector/multiselector.component';
import { InformationWrapperComponent } from '../components/information-wrapper/information-wrapper.component';
import { AddressAutocompleteComponent } from '../components/address-autocomplete/address-autocomplete.component';
import { PhotoUploaderComponent } from '../components/photouploader/photo-uploader.component';

// Import component documentation
import { ComponentDoc, COMPONENT_DOCS } from './component-docs';
import { FormService } from '../services/form.service';

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  grade: string;
  admissionDate: Date;
  status: string;
}

type SortEvent =
  | { sortBy: string; order: 'asc' | 'desc' }
  | { isNotSort: true };

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
    ItemTableComponent,
    DateInputComponent,
    MultiSelectorComponent,
    InformationWrapperComponent,
    AddressAutocompleteComponent,
    PhotoUploaderComponent,
  ],
  standalone: true,
})
export class ComponentsShowcaseComponent implements OnInit {
  components = COMPONENT_DOCS;
  categories = ['Core', 'Form', 'Data Display', 'Layout'];
  selectedTabIndex = 0;
  form: FormGroup;

  // Dummy data for components
  readonly studentsData: Student[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      gender: 'male',
      grade: '10',
      admissionDate: new Date('2023-01-15'),
      status: 'active',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      gender: 'female',
      grade: '11',
      admissionDate: new Date('2023-02-20'),
      status: 'active',
    },
    {
      id: 3,
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike@example.com',
      gender: 'male',
      grade: '9',
      admissionDate: new Date('2023-03-10'),
      status: 'inactive',
    },
    {
      id: 4,
      firstName: 'Sarah',
      lastName: 'Williams',
      email: 'sarah@example.com',
      gender: 'female',
      grade: '12',
      admissionDate: new Date('2023-04-05'),
      status: 'active',
    },
    {
      id: 5,
      firstName: 'David',
      lastName: 'Brown',
      email: 'david@example.com',
      gender: 'male',
      grade: '10',
      admissionDate: new Date('2023-05-01'),
      status: 'active',
    },
  ];

  readonly teachersData = [
    {
      id: 1,
      firstName: 'Robert',
      lastName: 'Wilson',
      email: 'robert@example.com',
      subject: 'Mathematics',
      joiningDate: new Date('2022-08-15'),
      status: 'active',
    },
    {
      id: 2,
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily@example.com',
      subject: 'Physics',
      joiningDate: new Date('2022-09-01'),
      status: 'active',
    },
    {
      id: 3,
      firstName: 'Michael',
      lastName: 'Anderson',
      email: 'michael@example.com',
      subject: 'Chemistry',
      joiningDate: new Date('2022-10-10'),
      status: 'inactive',
    },
  ];

  // Table state
  currentSortField: string = '';
  currentSortDirection: 'asc' | 'desc' = 'asc';
  filteredStudents: Student[] = [...this.studentsData];
  filteredTeachers: any[] = [...this.teachersData];

  readonly multiselectorItems = [
    { id: '1', label: 'Mathematics' },
    { id: '2', label: 'Physics' },
    { id: '3', label: 'Chemistry' },
    { id: '4', label: 'Biology' },
    { id: '5', label: 'Computer Science' },
  ];

  // Filtered items for searchable multiselector
  filteredItems = [...this.multiselectorItems];

  // Selected values for each multiselector
  selectedSubjects: { id: string; label: string }[] = [];
  selectedPrimarySubject: { id: string; label: string }[] = [];
  selectedSearchableSubjects: { id: string; label: string }[] = [];
  selectedPreSelectedSubjects: { id: string; label: string }[] = [
    { id: '1', label: 'Mathematics' },
    { id: '2', label: 'Physics' },
  ];

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    public formService: FormService
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      birthDate: ['', [Validators.required]],
      multipleSubjects: ['', [Validators.required]],
      primarySubject: ['', [Validators.required]],
      searchableSubjects: ['', [Validators.required]],
      preSelectedSubjects: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  get username() {
    return this.form.get('username') as FormControl;
  }

  get birthDate() {
    return this.form.get('birthDate') as FormControl;
  }

  get multipleSubjects() {
    return this.form.get('multipleSubjects') as FormControl;
  }

  get primarySubject() {
    return this.form.get('primarySubject') as FormControl;
  }

  get searchableSubjects() {
    return this.form.get('searchableSubjects') as FormControl;
  }

  get preSelectedSubjects() {
    return this.form.get('preSelectedSubjects') as FormControl;
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

  onSubjectSearch(searchValue: string) {
    if (!searchValue) {
      this.filteredItems = [...this.multiselectorItems];
      return;
    }

    const searchLower = searchValue.toLowerCase();
    this.filteredItems = this.multiselectorItems.filter((item) =>
      item.label.toLowerCase().includes(searchLower)
    );
  }

  onSubjectsSelect(ids: string[] | string) {
    if (Array.isArray(ids)) {
      this.selectedSubjects = this.multiselectorItems.filter((item) =>
        ids.includes(item.id)
      );
      this.form.get('multipleSubjects')?.setValue(ids);
    }
  }

  onPrimarySubjectSelect(id: string | string[]) {
    if (typeof id === 'string') {
      this.selectedPrimarySubject = this.multiselectorItems.filter(
        (item) => item.id === id
      );
      this.form.get('primarySubject')?.setValue(id);
    }
  }

  onSearchableSubjectsSelect(ids: string[] | string) {
    if (Array.isArray(ids)) {
      this.selectedSearchableSubjects = this.multiselectorItems.filter((item) =>
        ids.includes(item.id)
      );
      this.form.get('searchableSubjects')?.setValue(ids);
    }
  }

  onPreSelectedSubjectsSelect(ids: string[] | string) {
    if (Array.isArray(ids)) {
      this.selectedPreSelectedSubjects = this.multiselectorItems.filter(
        (item) => ids.includes(item.id)
      );
      this.form.get('preSelectedSubjects')?.setValue(ids);
    }
  }

  onPhotoUploaded(photoUrl: string): void {
    console.log('Photo uploaded successfully:', photoUrl);
    // You can handle the uploaded photo URL here
  }

  onTableSort(event: Params) {
    if (!event || !event['sortBy']) {
      this.currentSortField = '';
      this.currentSortDirection = 'asc';
      this.filteredStudents = [...this.studentsData];
      return;
    }

    const sortBy = event['sortBy'];
    const order = event['order'];
    this.currentSortField = sortBy;
    this.currentSortDirection = order;

    const sortedData = [...this.studentsData].sort((a, b) => {
      let valueA: any;
      let valueB: any;

      // Handle special case for 'name' column
      if (sortBy === 'name') {
        valueA = `${a.firstName} ${a.lastName}`.toLowerCase();
        valueB = `${b.firstName} ${b.lastName}`.toLowerCase();
      } else {
        valueA = a[sortBy as keyof Student];
        valueB = b[sortBy as keyof Student];

        // Handle date fields
        if (sortBy === 'admissionDate') {
          valueA = new Date(valueA as Date).getTime();
          valueB = new Date(valueB as Date).getTime();
        }

        // Handle string comparison
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          valueA = valueA.toLowerCase();
          valueB = valueB.toLowerCase();
        }
      }

      if (valueA < valueB) return order === 'asc' ? -1 : 1;
      if (valueA > valueB) return order === 'asc' ? 1 : -1;
      return 0;
    });

    this.filteredStudents = sortedData;
  }
}
