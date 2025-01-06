import { AddNewFormLayoutComponent } from '@/app/shared/components/addnew-form-layout/addnew-form-layout.component';
import { InputComponent } from '@/app/shared/components/input/input.component';
import { PhotoUploaderComponent } from '@/app/shared/components/photouploader/photo-uploader.component';
import { FormService } from '@/app/shared/services/form.service';
import { Student } from '@/app/shared/types';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentService } from '../../service/student.service';
import { NotificationService } from '@/app/shared/services/notification.service';

@Component({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputComponent,
    AddNewFormLayoutComponent,
    PhotoUploaderComponent,
  ],
  selector: 'sman-student-profile-info',
  templateUrl: 'student-profile-info.component.html',
})
export class StudentProfileInfoComponent implements OnInit {
  formChanged: boolean = false;

  constructor(
    public formService: FormService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public student: Student,
    public dialogRef: MatDialogRef<StudentProfileInfoComponent>,
    private studentService: StudentService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.editStudentProfileInfoForm.valueChanges.subscribe(() => {
      this.formChanged = this.checkFormChange();
    });
  }

  editStudentProfileInfoForm = this.fb.group({
    firstName: [this.student.firstName, [Validators.required]],
    lastName: [this.student.lastName, [Validators.required]],
    profileUrl: [this.student.profileUrl, [Validators.required]],
  });

  get firstName() {
    return this.editStudentProfileInfoForm.get('firstName') as FormControl;
  }
  get lastName() {
    return this.editStudentProfileInfoForm.get('lastName') as FormControl;
  }
  get profileUrl() {
    return this.editStudentProfileInfoForm.get('profileUrl') as FormControl;
  }

  choosePhoto(photoUrl: string) {
    this.profileUrl.setValue(photoUrl);
  }

  checkFormChange() {
    for (const [key, control] of Object.entries(
      this.editStudentProfileInfoForm.controls
    )) {
      if (control?.value !== this.student[key as keyof Student]) {
        return true;
      }
    }
    return false;
  }

  edit() {
    this.studentService
      .updateStudent(this.student.id!, {
        ...this.student,
        ...this.editStudentProfileInfoForm.value,
      } as Student)
      .subscribe(() => {
        this.notificationService.notify('Student info updated successfully!');
      });
  }
}
