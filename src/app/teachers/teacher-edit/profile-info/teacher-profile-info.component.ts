import { AddNewFormLayoutComponent } from '@/app/shared/components/addnew-form-layout/addnew-form-layout.component';
import { InputComponent } from '@/app/shared/components/input/input.component';
import { PhotoUploaderComponent } from '@/app/shared/components/photouploader/photo-uploader.component';
import { FormService } from '@/app/shared/services/form.service';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '@/app/shared/services/notification.service';
import { Teacher } from '@/app/shared/types';
import { TeacherService } from '../../services/teacher.service';

@Component({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputComponent,
    AddNewFormLayoutComponent,
    PhotoUploaderComponent,
  ],
  selector: 'sman-teacher-profile-info',
  templateUrl: 'teacher-profile-info.component.html',
})
export class TeacherProfileInfoComponent implements OnInit {
  formChanged: boolean = false;

  constructor(
    public formService: FormService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public teacher: Teacher,
    public dialogRef: MatDialogRef<TeacherProfileInfoComponent>,
    private teacherService: TeacherService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.editTeacherProfileInfoForm.valueChanges.subscribe(() => {
      this.formChanged = this.checkFormChange();
    });
  }

  editTeacherProfileInfoForm = this.fb.group({
    firstName: [this.teacher.firstName, [Validators.required]],
    lastName: [this.teacher.lastName, [Validators.required]],
    profileUrl: [this.teacher.profileUrl, [Validators.required]],
  });

  get firstName() {
    return this.editTeacherProfileInfoForm.get('firstName') as FormControl;
  }
  get lastName() {
    return this.editTeacherProfileInfoForm.get('lastName') as FormControl;
  }
  get profileUrl() {
    return this.editTeacherProfileInfoForm.get('profileUrl') as FormControl;
  }

  choosePhoto(photoUrl: string) {
    this.profileUrl.setValue(photoUrl);
  }

  checkFormChange() {
    for (const [key, control] of Object.entries(
      this.editTeacherProfileInfoForm.controls
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
        ...this.editTeacherProfileInfoForm.value,
      } as Teacher)
      .subscribe(() => {
        this.notificationService.notify('Teacher info updated successfully!');
        this.dialogRef.close();
      });
  }
}
