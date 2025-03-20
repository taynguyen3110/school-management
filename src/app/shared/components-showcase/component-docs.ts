export interface ComponentDoc {
  name: string;
  description: string;
  usage: string;
  props?: { name: string; type: string; description: string }[];
  category: 'Core' | 'Form' | 'Layout' | 'Data Display' | 'Utility';
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
        description: 'Icon element to be displayed before the button text. Use with [icon] attribute.',
      }
    ],
  },
  {
    name: 'Input',
    category: 'Form',
    description: 'A versatile input component that implements ControlValueAccessor for seamless integration with Angular forms. Features include validation states, error messages, and customizable styling.',
    usage: `<sman-input
  type="text"
  name="username"
  label="Username"
  placeholder="Enter username"
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
      }
    ],
  },
  {
    name: 'Loading Spinner',
    category: 'Utility',
    description: 'A loading spinner that can be controlled via input or loading service.',
    usage: `<sman-loading-spinner
  [isLoading]="true">
</sman-loading-spinner>`,
    props: [
      {
        name: 'isLoading',
        type: 'boolean',
        description: 'Control spinner visibility directly',
      }
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
      }
    ],
  },
  {
    name: 'Page Layout',
    category: 'Layout',
    description: 'Standard page layout with header and optional sidebar.',
    usage: `<sman-page-layout>
  <div content>
    Page content goes here
  </div>
</sman-page-layout>`,
    props: [],
  },
  {
    name: 'Item Table',
    category: 'Data Display',
    description: 'Dynamic table component with sorting and list type configuration.',
    usage: `<sman-item-table
  [items]="items"
  [listOf]="'students'"
  [enableSorting]="true"
  [fromDashboard]="false"
  (sort)="handleSort($event)">
</sman-item-table>`,
    props: [
      {
        name: 'items',
        type: 'any[]',
        description: 'Table data array',
      },
      {
        name: 'listOf',
        type: "'students' | 'parents' | 'teachers' | 'subjects' | 'classes'",
        description: 'Type of list to display, determines columns',
      },
      {
        name: 'enableSorting',
        type: 'boolean',
        description: 'Enable column sorting (default: true)',
      },
      {
        name: 'fromDashboard',
        type: 'boolean',
        description: 'Changes empty state message (default: false)',
      },
      {
        name: 'sort',
        type: 'EventEmitter<Params>',
        description: 'Event emitted when sorting changes',
      }
    ],
  },
  {
    name: 'Date Input',
    category: 'Form',
    description: 'Date input with calendar picker, validation, and error messages.',
    usage: `<sman-date-input
  [label]="'Birth Date'"
  [name]="'dateOfBirth'"
  [hasError]="{ fieldInvalid: true, required: true }"
  [errMsgs]="{ required: 'Please select a date', fieldInvalid: 'Invalid date format' }"
  [(ngModel)]="birthDate">
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
      }
    ],
  },
  {
    name: 'Multiselector',
    category: 'Form',
    description: 'Multiple selection component with search, tags, and validation support.',
    usage: `<sman-multiselector
  [items]="subjects"
  [selected]="[]"
  [placeholder]="'Choose subjects...'"
  [supportMulti]="true"
  [validation]="true"
  [hasError]="{ required: true }"
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
      }
    ],
  },
  {
    name: 'Information Wrapper',
    category: 'Layout',
    description: 'Container for displaying information with optional edit button.',
    usage: `<sman-info-wrapper
  [profilePic]="false"
  [editable]="true"
  (edit)="handleEdit()">
  <div title>Section Title</div>
  <div content>Content goes here</div>
</sman-info-wrapper>`,
    props: [
      {
        name: 'profilePic',
        type: 'boolean',
        description: 'Enable profile picture mode (default: false)',
      },
      {
        name: 'editable',
        type: 'boolean',
        description: 'Show edit button (default: true)',
      },
      {
        name: 'edit',
        type: 'EventEmitter<void>',
        description: 'Event emitted when edit button is clicked',
      }
    ],
  },
  {
    name: 'Address Input',
    category: 'Form',
    description: 'An address input component with Google Places Autocomplete integration. Provides address suggestions as you type and implements ControlValueAccessor for seamless form integration.',
    usage: `<sman-address-autocomplete
  label="Address"
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
      }
    ],
  },
];
