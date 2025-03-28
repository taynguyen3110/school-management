import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PhotoUploaderComponent } from '../../shared/components/photouploader/photo-uploader.component';
import { FormService } from '../../shared/services/form.service';
import { TeacherService } from '../services/teacher.service';
import { Teacher } from '../../shared/types';
import { NotificationService } from '../../shared/services/notification.service';
import { AddNewFormLayoutComponent } from '../../shared/components/addnew-form-layout/addnew-form-layout.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { MatDialogRef } from '@angular/material/dialog';
import { AddressAutocompleteComponent } from '@/app/shared/components/address-autocomplete/address-autocomplete.component';
import { DateInputComponent } from '@/app/shared/components/date-input/date-input.component';
import checkFormChange from '@/app/shared/utils/checkFormChanged';
import { environment } from '@/environments/environment';

@Component({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PhotoUploaderComponent,
    AddNewFormLayoutComponent,
    InputComponent,
    AddressAutocompleteComponent,
    DateInputComponent,
  ],
  selector: 'sman-add-teacher',
  templateUrl: 'teacher-add.component.html',
})
export class AddTeacherComponent implements OnInit {
  isDirty: boolean = false;

  readonly dialogRef = inject(MatDialogRef<AddTeacherComponent>);
  private readonly apiUrl = environment.apiUrl;

  constructor(
    private fb: FormBuilder,
    public formService: FormService,
    private teacherService: TeacherService,
    private notificationService: NotificationService
  ) {}

  addTeacherForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    address: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required]],
    profileUrl: [
      `${this.apiUrl}/photos/profile-picture.jpg`,
      [Validators.required],
    ],
    admissionDate: ['', [Validators.required]],
  });

  get firstName() {
    return this.addTeacherForm.get('firstName') as FormControl;
  }
  get lastName() {
    return this.addTeacherForm.get('lastName') as FormControl;
  }
  get address() {
    return this.addTeacherForm.get('address') as FormControl;
  }
  get gender() {
    return this.addTeacherForm.get('gender') as FormControl;
  }
  get phone() {
    return this.addTeacherForm.get('phone') as FormControl;
  }
  get email() {
    return this.addTeacherForm.get('email') as FormControl;
  }
  get profileUrl() {
    return this.addTeacherForm.get('profileUrl') as FormControl;
  }
  get admissionDate() {
    return this.addTeacherForm.get('admissionDate') as FormControl;
  }

  ngOnInit() {
    this.addTeacherForm.valueChanges.subscribe(() => {
      this.isDirty = checkFormChange(this.addTeacherForm);
    });
  }

  choosePhoto(photoUrl: string) {
    this.profileUrl.setValue(photoUrl);
  }

  addTeacher(e: Event) {
    e.preventDefault();
    this.teacherService
      .addTeacher(this.addTeacherForm.value as Teacher)
      .subscribe(() => {
        this.isDirty = false;
        this.notificationService.notify('Teacher added successfully!');
        this.dialogRef.close();
      });
  }
}
