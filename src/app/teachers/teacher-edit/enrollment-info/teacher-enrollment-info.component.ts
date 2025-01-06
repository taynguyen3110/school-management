import { ParentsService } from '@/app/parents/services/parents.service';
import { ClassesService } from '@/app/school-classes/services/classes.service';
import { AddNewFormLayoutComponent } from '@/app/shared/components/addnew-form-layout/addnew-form-layout.component';
import { CustomInputComponent } from '@/app/shared/components/custom-input/custom-input.component';
import { InputComponent } from '@/app/shared/components/input/input.component';
import { MultiSelectorComponent } from '@/app/shared/components/multiselector/multiselector.component';
import { toLabelObject } from '@/app/shared/components/multiselector/utils/toLabelObject';
import { FormService } from '@/app/shared/services/form.service';
import { LabelObj, Teacher } from '@/app/shared/types';
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
import { DateInputComponent } from '@/app/shared/components/date-input/date-input.component';
import checkFormChange from '@/app/shared/utils/checkFormChanged';
import { TeacherService } from '../../services/teacher.service';

@Component({
  imports: [
    CommonModule,
    InputComponent,
    AddNewFormLayoutComponent,
    MultiSelectorComponent,
    CustomInputComponent,
    ReactiveFormsModule,
    DateInputComponent,
  ],
  selector: 'sman-teacher-enrollment-info',
  templateUrl: 'teacher-enrollment-info.component.html',
})
export class TeacherEnrollmentInfoComponent implements OnInit {
  formChanged: boolean = false;

  classesList: LabelObj[] = [];
  parentsList: LabelObj[] = [];

  constructor(
    public formService: FormService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public teacher: Teacher,
    private classesService: ClassesService,
    private parentsService: ParentsService,
    private teacherService: TeacherService,
    public dialogRef: MatDialogRef<TeacherEnrollmentInfoComponent>,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.editTeacherEnrollmentInfoForm.valueChanges.subscribe(() => {
      this.formChanged = checkFormChange(
        this.editTeacherEnrollmentInfoForm,
        this.teacher
      );
    });
  }

  editTeacherEnrollmentInfoForm = this.fb.group({
    admissionDate: [this.teacher.admissionDate, [Validators.required]],
  });

  get admissionDate() {
    return this.editTeacherEnrollmentInfoForm.get(
      'admissionDate'
    ) as FormControl;
  }

  toLabelObject(obj: any[], keyId: string, keyLabel: string[]): LabelObj[] {
    return toLabelObject(obj, keyId, keyLabel);
  }

  edit() {
    this.teacherService
      .updateTeacher(this.teacher.id!, {
        ...this.teacher,
        ...this.editTeacherEnrollmentInfoForm.value,
      } as Teacher)
      .subscribe(() => {
        this.notificationService.notify('Teacher info updated successfully!');
        this.dialogRef.close();
      });
  }
}
