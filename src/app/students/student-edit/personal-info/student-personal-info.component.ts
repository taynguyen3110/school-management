import { AddNewFormLayoutComponent } from '@/app/shared/components/addnew-form-layout/addnew-form-layout.component';
import { InputComponent } from '@/app/shared/components/input/input.component';
import { FormService } from '@/app/shared/services/form.service';
import { Student, StudentPersonalInfo } from '@/app/shared/types';
import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentService } from '../../service/student.service';
import { NotificationService } from '@/app/shared/services/notification.service';
import { DateInputComponent } from '@/app/shared/components/date-input/date-input.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    AddNewFormLayoutComponent,
    ReactiveFormsModule,
    DateInputComponent,
  ],
  selector: 'sman-student-personal-info',
  templateUrl: 'student-personal-info.component.html',
})
export class StudentPersonalInfoComponent implements OnInit {
  formChanged: boolean = false;

  constructor(
    public formService: FormService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private student: Student,
    public dialogRef: MatDialogRef<StudentPersonalInfoComponent>,
    private studentService: StudentService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.editStudentPersonalInfoForm.valueChanges.subscribe(() => {
      this.formChanged = this.checkFormChange();
    });
  }

  editStudentPersonalInfoForm = this.fb.group({
    gender: [this.student.gender, [Validators.required]],
    dateOfBirth: [this.student.dateOfBirth, [Validators.required]],
    address: [this.student.address, [Validators.required]],
    phone: [this.student.phone, [Validators.required]],
    email: [this.student.email, [Validators.required]],
  });

  get gender() {
    return this.editStudentPersonalInfoForm.get('gender') as FormControl;
  }
  get address() {
    return this.editStudentPersonalInfoForm.get('address') as FormControl;
  }
  get dateOfBirth() {
    return this.editStudentPersonalInfoForm.get('dateOfBirth') as FormControl;
  }
  get phone() {
    return this.editStudentPersonalInfoForm.get('phone') as FormControl;
  }
  get email() {
    return this.editStudentPersonalInfoForm.get('email') as FormControl;
  }

  checkFormChange() {
    for (const [key, control] of Object.entries(
      this.editStudentPersonalInfoForm.controls
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
        ...this.editStudentPersonalInfoForm.value,
      } as Student)
      .subscribe(() => {
        this.notificationService.notify('Student info updated successfully!');
        this.cancel();
      });
  }

  cancel() {
    this.dialogRef.close();
  }
}
