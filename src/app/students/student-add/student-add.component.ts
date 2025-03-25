import {
  AfterViewInit,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormService } from '../../shared/services/form.service';
import { CommonModule } from '@angular/common';
import { StudentService } from '../service/student.service';
import { PhotoUploaderComponent } from '../../shared/components/photouploader/photo-uploader.component';
import { LabelObj, Student } from '../../shared/types';
import { AddNewFormLayoutComponent } from '../../shared/components/addnew-form-layout/addnew-form-layout.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { MultiSelectorComponent } from '../../shared/components/multiselector/multiselector.component';
import { toLabelObject } from '../../shared/components/multiselector/utils/toLabelObject';
import { ParentsService } from '../../parents/services/parents.service';
import { NotificationService } from '../../shared/services/notification.service';
import { ClassesService } from '../../school-classes/services/classes.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { HeadingComponent } from '../../shared/components/heading/heading.component';
import { AddressAutocompleteComponent } from '../../shared/components/address-autocomplete/address-autocomplete.component';
import { DateInputComponent } from '../../shared/components/date-input/date-input.component';
import checkFormChange from '@/app/shared/utils/checkFormChanged';
import { environment } from '@/environments/environment';

@Component({
  selector: 'sman-add-student',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PhotoUploaderComponent,
    AddNewFormLayoutComponent,
    InputComponent,
    MultiSelectorComponent,
    MatDialogModule,
    MatButtonModule,
    HeadingComponent,
    AddressAutocompleteComponent,
    DateInputComponent,
  ],
  templateUrl: './student-add.component.html',
})
export class AddStudentComponent implements OnInit, AfterViewInit, OnDestroy {
  classesList: LabelObj[] = [];
  parentsList: LabelObj[] = [];
  isDirty: boolean = false;

  readonly dialogRef = inject(MatDialogRef<AddStudentComponent>);
  private readonly apiUrl = environment.apiUrl;

  constructor(
    private fb: FormBuilder,
    public formService: FormService,
    private studentService: StudentService,
    private classesService: ClassesService,
    private parentsService: ParentsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.getClassList();
    this.addStudentForm.valueChanges.subscribe(() => {
      this.isDirty = checkFormChange(this.addStudentForm);
    });
  }

  ngAfterViewInit(): void {}

  addStudentForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    classIds: [[] as string[], [Validators.required]],
    parentIds: [[] as string[], [Validators.required]],
    address: ['', [Validators.required]],
    dateOfBirth: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required]],
    admissionDate: ['', [Validators.required]],
    profileUrl: [
      `${this.apiUrl}/photos/profile-picture.jpg`,
      [Validators.required],
    ],
  });

  get firstName() {
    return this.addStudentForm.get('firstName') as FormControl;
  }
  get lastName() {
    return this.addStudentForm.get('lastName') as FormControl;
  }
  get gender() {
    return this.addStudentForm.get('gender') as FormControl;
  }
  get classIds() {
    return this.addStudentForm.get('classIds') as FormControl;
  }
  get parentIds() {
    return this.addStudentForm.get('parentIds') as FormControl;
  }
  get address() {
    return this.addStudentForm.get('address') as FormControl;
  }
  get dateOfBirth() {
    return this.addStudentForm.get('dateOfBirth') as FormControl;
  }
  get phone() {
    return this.addStudentForm.get('phone') as FormControl;
  }
  get email() {
    return this.addStudentForm.get('email') as FormControl;
  }
  get admissionDate() {
    return this.addStudentForm.get('admissionDate') as FormControl;
  }
  get profileUrl() {
    return this.addStudentForm.get('profileUrl') as FormControl;
  }

  choosePhoto(photoUrl: string) {
    this.profileUrl.setValue(photoUrl);
  }

  getClassList() {
    this.classesService.getClasses().subscribe((data) => {
      this.classesList = toLabelObject(data.classes, 'id', ['name']);
    });
  }

  lookUpClassesByName(name: string) {
    this.classesService.lookUpByName(name).subscribe((data) => {
      this.classesList = toLabelObject(data.classes, 'id', ['name']);
    });
  }

  handleSelectClass(selectedClasses: string[] | string) {
    if (Array.isArray(selectedClasses)) {
      this.classIds.setValue(selectedClasses);
    }
  }

  lookUpParentsByName(name: string) {
    this.parentsService.lookUpByName(name).subscribe((data) => {
      this.parentsList = toLabelObject(data.parents, 'id', [
        'firstName',
        'lastName',
      ]);
    });
  }

  handleSelectParents(selectedParents: string[] | string) {
    if (Array.isArray(selectedParents)) {
      this.parentIds.setValue(selectedParents);
    }
  }

  addStudent(e: Event) {
    e.preventDefault();
    this.studentService
      .addStudent(this.addStudentForm.value as Student)
      .subscribe(() => {
        this.isDirty = false;
        this.dialogRef.close();
        this.notificationService.notify('Student added successfully!');
      });
  }

  ngOnDestroy(): void {}
}
