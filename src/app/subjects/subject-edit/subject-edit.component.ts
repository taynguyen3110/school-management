import { ParentsService } from '@/app/parents/services/parents.service';
import { ClassesService } from '@/app/school-classes/services/classes.service';
import { AddNewFormLayoutComponent } from '@/app/shared/components/addnew-form-layout/addnew-form-layout.component';
import { CustomInputComponent } from '@/app/shared/components/custom-input/custom-input.component';
import { InputComponent } from '@/app/shared/components/input/input.component';
import { MultiSelectorComponent } from '@/app/shared/components/multiselector/multiselector.component';
import { toLabelObject } from '@/app/shared/components/multiselector/utils/toLabelObject';
import { FormService } from '@/app/shared/services/form.service';
import { LabelObj, SchoolSubject, Student } from '@/app/shared/types';
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
import { SubjectService } from '../services/subject.service';
import { TeacherService } from '@/app/teachers/services/teacher.service';

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
  selector: 'sman-subject-edit',
  templateUrl: 'subject-edit.component.html',
})
export class SubjectEditComponent implements OnInit {
  formChanged: boolean = false;

  classesList: LabelObj[] = [];
  teacherList: LabelObj[] = [];
  weekDays: LabelObj[] = [
    { id: 'monday', label: 'Monday' },
    { id: 'tuesday', label: 'Tuesday' },
    { id: 'wednesday', label: 'Wednesday' },
    { id: 'thursday', label: 'Thursday' },
    { id: 'friday', label: 'Friday' },
  ];

  constructor(
    public formService: FormService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public subject: SchoolSubject,
    private classesService: ClassesService,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    public dialogRef: MatDialogRef<SubjectEditComponent>,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.editSubjectInfoForm.valueChanges.subscribe(() => {
      this.formChanged = checkFormChange(
        this.editSubjectInfoForm,
        this.subject
      );
    });
  }

  editSubjectInfoForm = this.fb.group({
    classId: [this.subject.classId, [Validators.required]],
    daysOfWeek: [this.subject.daysOfWeek as string[], [Validators.required]],
    teacherId: [this.subject.teacherId, [Validators.required]],
  });

  get classId() {
    return this.editSubjectInfoForm.get('classId') as FormControl;
  }
  get daysOfWeek() {
    return this.editSubjectInfoForm.get('daysOfWeek') as FormControl;
  }
  get teacherId() {
    return this.editSubjectInfoForm.get('teacherId') as FormControl;
  }

  get scheduleLabelObj() {
    return this.daysOfWeek.value.map((id: string) => {
      return {
        id,
        label: id,
      };
    });
  }

  lookUpClassesByName(name: string) {
    this.classesService.lookUpByName(name).subscribe((data) => {
      this.classesList = toLabelObject(data.classes, 'id', ['name']);
    });
  }

  handleSelectClass(selectedClasses: string[] | string) {
    this.classId.setValue(selectedClasses);
  }

  handleSelectSchedule(selectedSchedule: string[] | string) {
    if (Array.isArray(selectedSchedule)) {
      this.daysOfWeek.setValue(selectedSchedule);
    }
  }

  lookUpTeachersByName(name: string) {
    this.teacherService.lookUpByName(name).subscribe((data) => {
      this.teacherList = toLabelObject(data.teachers, 'id', [
        'firstName',
        'lastName',
      ]);
    });
  }

  toLabelObj(obj: any[], keyId: string, keyLabel: string[]) {
    return toLabelObject(obj, keyId, keyLabel);
  }

  handleSelectTeacher(selectedTeacher: string[] | string) {
    this.teacherId.setValue(selectedTeacher);
  }

  edit() {
    this.subjectService
      .updateSubject(this.subject.id!, {
        ...this.subject,
        ...this.editSubjectInfoForm.value,
      } as SchoolSubject)
      .subscribe(() => {
        this.notificationService.notify('Subject info updated successfully!');
        this.dialogRef.close();
      });
  }
}
