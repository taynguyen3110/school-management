import { AddNewFormLayoutComponent } from '@/app/shared/components/addnew-form-layout/addnew-form-layout.component';
import { InputComponent } from '@/app/shared/components/input/input.component';
import { FormService } from '@/app/shared/services/form.service';
import { Teacher } from '@/app/shared/types';
import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '@/app/shared/services/notification.service';
import { DateInputComponent } from '@/app/shared/components/date-input/date-input.component';
import { TeacherService } from '../../services/teacher.service';
import { AddressAutocompleteComponent } from '@/app/shared/components/address-autocomplete/address-autocomplete.component';

@Component({
  imports: [
    CommonModule,
    InputComponent,
    AddNewFormLayoutComponent,
    ReactiveFormsModule,
    DateInputComponent,
    AddressAutocompleteComponent,
  ],
  selector: 'sman-teacher-personal-info',
  templateUrl: 'teacher-personal-info.component.html',
})
export class TeacherPersonalInfoComponent implements OnInit {
  formChanged: boolean = false;

  constructor(
    public formService: FormService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private teacher: Teacher,
    public dialogRef: MatDialogRef<TeacherPersonalInfoComponent>,
    private teacherService: TeacherService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.editTeacherPersonalInfoForm.valueChanges.subscribe(() => {
      this.formChanged = this.checkFormChange();
    });
  }

  editTeacherPersonalInfoForm = this.fb.group({
    gender: [this.teacher.gender, [Validators.required]],
    address: [this.teacher.address, [Validators.required]],
    phone: [this.teacher.phone, [Validators.required]],
    email: [this.teacher.email, [Validators.required]],
  });

  get gender() {
    return this.editTeacherPersonalInfoForm.get('gender') as FormControl;
  }
  get address() {
    return this.editTeacherPersonalInfoForm.get('address') as FormControl;
  }
  get phone() {
    return this.editTeacherPersonalInfoForm.get('phone') as FormControl;
  }
  get email() {
    return this.editTeacherPersonalInfoForm.get('email') as FormControl;
  }

  checkFormChange() {
    for (const [key, control] of Object.entries(
      this.editTeacherPersonalInfoForm.controls
    )) {
      if (control?.value !== this.teacher[key as keyof Teacher]) {
        return true;
      }
    }
    return false;
  }

  edit() {
    this.teacherService
      .updateTeacher(this.teacher.id!, {
        ...this.teacher,
        ...this.editTeacherPersonalInfoForm.value,
      } as Teacher)
      .subscribe(() => {
        this.notificationService.notify('Teacher info updated successfully!');
        this.dialogRef.close();
      });
  }
}
