export interface ComponentDoc {
  name: string;
  description: string;
  usage: string;
  props?: { name: string; type: string; description: string }[];
  category: 'Core' | 'Form' | 'Layout' | 'Data Display' | 'Feedback';
}

export const COMPONENT_DOCS: ComponentDoc[] = [
  {
    name: 'Button',
    category: 'Core',
    description:
      'A versatile button component with different styles and states. Supports icons through content projection.',
    usage: `<sman-button
  text="Click me"
  btnType="primary"
  [isDisabled]="false"
  (buttonClick)="handleClick($event)">
  <i class="fa-solid fa-plus" icon></i>
</sman-button>`,
    props: [
      {
        name: 'text',
        type: 'string',
        description: 'Button text content',
      },
      {
        name: 'btnType',
        type: "'primary' | 'secondary' | 'cancel' | 'edit' | 'back' | 'delete'",
        description: 'Button style variant',
      },
      {
        name: 'isDisabled',
        type: 'boolean',
        description: 'Disable button state',
      },
      {
        name: 'className',
        type: 'string',
        description: 'Additional CSS classes',
      },
      {
        name: 'buttonClick',
        type: 'EventEmitter<Event>',
        description: 'Event emitted when button is clicked',
      },
      {
        name: 'icon',
        type: 'Content Projection',
        description:
          'Icon element to be displayed before the button text. Use with [icon] attribute.',
      },
    ],
  },
  {
    name: 'Input',
    category: 'Form',
    description:
      'A versatile input component that implements ControlValueAccessor for seamless integration with Angular forms. Features include validation states, error messages, and customizable styling.',
    usage: `<sman-input
  type="text"
  name="username"
  label="Username"
  placeholder="Please enter username"
  [hasError]="form.get('username')?.errors"
  [errMsgs]="{
    required: 'Username is required',
    minlength: 'Username must be at least 3 characters'
  }"
  formControlName="username">
</sman-input>`,
    props: [
      {
        name: 'type',
        type: 'string',
        description: 'The type of input (text, password, email, etc.)',
      },
      {
        name: 'name',
        type: 'string',
        description: 'The name attribute of the input field',
      },
      {
        name: 'label',
        type: 'string',
        description: 'Label text displayed above the input',
      },
      {
        name: 'placeholder',
        type: 'string',
        description: 'Placeholder text shown when the input is empty',
      },
      {
        name: 'hasError',
        type: 'ValidationErrors',
        description: 'Validation errors object from the form control',
      },
      {
        name: 'errMsgs',
        type: '{ [key: string]: string }',
        description: 'Object mapping error keys to error messages',
      },
    ],
  },
  {
    name: 'Profile Photo',
    category: 'Core',
    description: 'Displays user profile photo with customizable size.',
    usage: `<sman-profile-photo
  [photoSrc]="'assets/images/portrait.jpg'"
  [size]="40">
</sman-profile-photo>`,
    props: [
      {
        name: 'photoSrc',
        type: 'string',
        description: 'URL of the profile photo',
      },
      {
        name: 'size',
        type: 'number',
        description: 'Size of the photo in pixels (default: 40)',
      },
    ],
  },
  {
    name: 'Layout',
    category: 'Layout',
    description:
      'A comprehensive layout system that provides structure for pages, including header, content area, and optional components like filters, tables, and pagination.',
    usage: `<sman-page-layout
  title="Students"
  (createNew)="openDialog()"
  [isLoading]="isLoading"
>
  <sman-filter
    filter
    (filter)="filterStudents($event)"
    (reset)="resetFilter()"
    [queryParams]="filterParams"
  ></sman-filter>
  <sman-item-table
    table
    listOf="students"
    [items]="students"
    (sort)="filterStudents($event)"
  ></sman-item-table>
  @if (studentsCount) {
  <sman-pagination
    pagination
    [pageSize]="itemPerPage"
    [totalCount]="studentsCount"
    [currentPage]="currentPage"
    (pageChange)="handlePageChange($event)"
  />
  }
</sman-page-layout>`,
    props: [
      {
        name: 'title',
        type: 'string',
        description: 'The title displayed in the page header',
      },
      {
        name: 'isLoading',
        type: 'boolean',
        description: 'Controls the loading state of the page',
      },
      {
        name: 'createNew',
        type: 'EventEmitter<void>',
        description: 'Event emitted when the create button is clicked',
      },
      {
        name: 'filter',
        type: 'Content Projection',
        description: 'Slot for filter component',
      },
      {
        name: 'table',
        type: 'Content Projection',
        description: 'Slot for table component',
      },
      {
        name: 'pagination',
        type: 'Content Projection',
        description: 'Slot for pagination component',
      },
    ],
  },
  {
    name: 'Item Table',
    category: 'Data Display',
    description:
      'A dynamic table component that supports sorting, responsive columns, and different data types (students, teachers, parents, subjects, classes). Features include column sorting, responsive layout, and dashboard view mode.',
    usage: `<sman-item-table
  [items]="students"
  listOf="students"
  [enableSorting]="true"
  [fromDashboard]="false"
  (sort)="handleSort($event)">
</sman-item-table>`,
    props: [
      {
        name: 'items',
        type: 'any[]',
        description:
          'Array of data to display in the table. Structure should match the selected listOf type.',
      },
      {
        name: 'listOf',
        type: "'students' | 'parents' | 'teachers' | 'subjects' | 'classes'",
        description:
          'Determines the type of data being displayed and configures columns accordingly.',
      },
      {
        name: 'enableSorting',
        type: 'boolean',
        description: 'Enables column sorting functionality (default: true)',
      },
      {
        name: 'fromDashboard',
        type: 'boolean',
        description:
          'Changes table appearance for dashboard view (default: false)',
      },
      {
        name: 'sort',
        type: 'EventEmitter<{ sortBy: string; order: "asc" | "desc" } | { isNotSort: true }>',
        description:
          'Event emitted when sorting changes. Returns sort field and direction, or isNotSort flag when sorting is cleared.',
      },
    ],
  },
  {
    name: 'Date Input',
    category: 'Form',
    description:
      'Date input with calendar picker, validation, and error messages.',
    usage: `<sman-date-input
  label="Birth Date"
  name="dateOfBirth"
  [hasError]="form.get('dateOfBirth')?.errors"
  [errMsgs]="{ 
    required: 'Please select a date', 
    fieldInvalid: 'Invalid date format' 
  }"
  formControlName="dateOfBirth">
</sman-date-input>`,
    props: [
      {
        name: 'label',
        type: 'string',
        description: 'Input label text',
      },
      {
        name: 'name',
        type: 'string',
        description: 'Input name and id',
      },
      {
        name: 'className',
        type: 'string',
        description: 'Additional CSS classes',
      },
      {
        name: 'hasError',
        type: 'ValidationErrors',
        description: 'Validation error states',
      },
      {
        name: 'errMsgs',
        type: '{ [key: string]: string }',
        description: 'Error messages for different validation states',
      },
    ],
  },
  {
    name: 'Multiselector',
    category: 'Form',
    description:
      'Multiple selection component with search, tags, and validation support.',
    usage: `<sman-multiselector
  label="Subjects"
  [items]="subjects"
  [selected]="[]"
  [placeholder]="'Choose subjects...'"
  [supportMulti]="true"
  [validation]="true"
  [hasError]="errorObject"
  [errMsgs]="{ required: 'Please select at least one subject' }"
  (select)="handleSelect($event)"
  (inputTyped)="handleSearch($event)">
</sman-multiselector>`,
    props: [
      {
        name: 'items',
        type: '{ id: string; label: string }[]',
        description: 'Available options to select from',
      },
      {
        name: 'selected',
        type: '{ id: string; label: string }[]',
        description: 'Currently selected items',
      },
      {
        name: 'placeholder',
        type: 'string',
        description: 'Placeholder text when no items selected',
      },
      {
        name: 'supportMulti',
        type: 'boolean',
        description: 'Allow multiple item selection',
      },
      {
        name: 'validation',
        type: 'boolean',
        description: 'Enable validation (default: true)',
      },
      {
        name: 'lookUp',
        type: 'boolean',
        description: 'Enable search functionality',
      },
      {
        name: 'hasError',
        type: 'ValidationErrors',
        description: 'Validation error states',
      },
      {
        name: 'errMsgs',
        type: '{ [key: string]: string }',
        description: 'Error messages for different validation states',
      },
      {
        name: 'select',
        type: 'EventEmitter<string[] | string>',
        description: 'Event emitted when items are selected/deselected',
      },
      {
        name: 'inputTyped',
        type: 'EventEmitter<string>',
        description: 'Event emitted when search input changes',
      },
    ],
  },
  {
    name: 'Address Input',
    category: 'Form',
    description:
      'An address input component with Google Places Autocomplete integration. Provides address suggestions as you type and implements ControlValueAccessor for seamless form integration.',
    usage: `<sman-address-autocomplete
  label="Address Autocomplete"
  placeholder="Enter your address"
  [hasError]="form.get('address')?.errors"
  [errMsgs]="{ required: 'Please enter a valid address' }"
  formControlName="address">
</sman-address-autocomplete>`,
    props: [
      {
        name: 'label',
        type: 'string',
        description: 'Label text displayed above the input',
      },
      {
        name: 'name',
        type: 'string',
        description: 'The name attribute of the input field',
      },
      {
        name: 'placeholder',
        type: 'string',
        description: 'Placeholder text shown when the input is empty',
      },
      {
        name: 'hasError',
        type: 'ValidationErrors',
        description: 'Validation errors object from the form control',
      },
      {
        name: 'errMsgs',
        type: '{ [key: string]: string }',
        description: 'Object mapping error keys to error messages',
      },
    ],
  },
  {
    name: 'Photo Uploader',
    category: 'Form',
    description:
      'A component for uploading and previewing profile photos with drag-and-drop support, image validation, and automatic resizing.',
    usage: `<sman-photo-uploader
  (photoUploaded)="handlePhotoUpload($event)">
</sman-photo-uploader>`,
    props: [
      {
        name: 'inputUrl',
        type: 'string',
        description: 'Initial photo URL to display',
      },
      {
        name: 'photoUploaded',
        type: 'EventEmitter<string>',
        description:
          'Event emitted when a photo is successfully uploaded, containing the new photo URL',
      },
    ],
  },
  {
    name: 'Dialog',
    category: 'Layout',
    description:
      'A modal dialog component that provides a layout container for displaying content in an overlay window. Useful for confirmations, forms, and other content that needs to be displayed above the current page.',
    usage: `
      <sman-button
        text="Open Dialog"
        btnType="primary"
        (buttonClick)="openDialog()">
      </sman-button>

      // In your component:
      openDialog(): void {
        const dialogRef = this.dialog.open(DialogComponent, {
          data: {
            title: 'Confirm Action',
            message: 'Are you sure you want to proceed?'
          },
          width: '400px',
          disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            // User confirmed
          } else {
            // User cancelled
          }
        });
      }
    `,
    props: [
      {
        name: 'data',
        type: 'any',
        description: 'Data to be passed to the dialog component',
      },
      {
        name: 'width',
        type: 'string',
        description: 'Width of the dialog',
      },
      {
        name: 'disableClose',
        type: 'boolean',
        description:
          'Whether the dialog can be closed by clicking outside or pressing ESC',
      },
    ],
  },
  {
    name: 'Line Chart',
    category: 'Data Display',
    description:
      'A responsive line chart component built with Google Charts. Features include smooth curves, animations, and automatic resizing based on screen size.',
    usage: `<sman-stats-wrapper [isChart]="true">
  <sman-enrollment-stats-chart
    chart
    [enrollmentStats]="enrollmentData">
  </sman-enrollment-stats-chart>
</sman-stats-wrapper>`,
    props: [
      {
        name: 'enrollmentStats',
        type: 'any[]',
        description:
          'Array of enrollment data points. Each point should be an array with [year, count] values.',
      },
      {
        name: 'chart',
        type: 'attribute',
        description:
          'Required attribute to identify the chart component within the stats wrapper.',
      },
    ],
  },
  {
    name: 'Pie Chart',
    category: 'Data Display',
    description:
      'A donut chart component built with Google Charts. Features include custom colors, animations, and a transparent background.',
    usage: `<sman-stats-wrapper [isChart]="true">
  <sman-gender-ratio-chart
    chart
    [width]="300"
    [height]="250"
    [maleCount]="120"
    [femaleCount]="160">
  </sman-gender-ratio-chart>
</sman-stats-wrapper>
`,
    props: [
      {
        name: 'width',
        type: 'number',
        description: 'Width of the chart in pixels.',
      },
      {
        name: 'height',
        type: 'number',
        description: 'Height of the chart in pixels.',
      },
      {
        name: 'maleCount',
        type: 'number',
        description: 'Number of male students.',
      },
      {
        name: 'femaleCount',
        type: 'number',
        description: 'Number of female students.',
      },
      {
        name: 'chart',
        type: 'attribute',
        description:
          'Required attribute to identify the chart component within the stats wrapper.',
      },
    ],
  },
];
