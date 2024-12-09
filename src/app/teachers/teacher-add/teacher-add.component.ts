import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
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

@Component({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        PhotoUploaderComponent,
        AddNewFormLayoutComponent,
        InputComponent,
    ],
    selector: 'sman-add-teacher',
    templateUrl: 'teacher-add.component.html'
})
export class AddTeacherComponent implements OnInit {
  @Input() teacher!: Teacher;
  isDirty: boolean = false;

  readonly dialogRef = inject(MatDialogRef<AddTeacherComponent>);

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
      'http://localhost:3001/photos/profile-picture.jpg',
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
      this.isDirty = this.addTeacherForm.dirty;
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
        this.dialogRef.close();
        this.notificationService.notify('Teacher added successfully!');
      });
  }
}
