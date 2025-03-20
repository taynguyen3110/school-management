import { ParentsService } from '@/app/parents/services/parents.service';
import { ClassesService } from '@/app/school-classes/services/classes.service';
import { AddNewFormLayoutComponent } from '@/app/shared/components/addnew-form-layout/addnew-form-layout.component';
import { MultiSelectorComponent } from '@/app/shared/components/multiselector/multiselector.component';
import { toLabelObject } from '@/app/shared/components/multiselector/utils/toLabelObject';
import { FormService } from '@/app/shared/services/form.service';
import { LabelObj, Student } from '@/app/shared/types';
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
import { DateInputComponent } from '@/app/shared/components/date-input/date-input.component';
import checkFormChange from '@/app/shared/utils/checkFormChanged';

@Component({
  imports: [
    CommonModule,
    AddNewFormLayoutComponent,
    MultiSelectorComponent,
    ReactiveFormsModule,
    DateInputComponent,
  ],
  selector: 'sman-student-enrollment-info',
  templateUrl: 'student-enrollment-info.component.html',
})
export class StudentEnrollmentInfoComponent implements OnInit {
  formChanged: boolean = false;

  classesList: LabelObj[] = [];
  parentsList: LabelObj[] = [];

  constructor(
    public formService: FormService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public student: Student,
    private classesService: ClassesService,
    private parentsService: ParentsService,
    private studentService: StudentService,
    public dialogRef: MatDialogRef<StudentEnrollmentInfoComponent>,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.editStudentEnrollmentInfoForm.valueChanges.subscribe(() => {
      this.formChanged = checkFormChange(
        this.editStudentEnrollmentInfoForm,
        this.student
      );
    });
  }

  editStudentEnrollmentInfoForm = this.fb.group({
    classIds: [
      this.student.classes?.map((c) => c.id) as string[],
      [Validators.required],
    ],
    parentIds: [
      this.student.parents?.map((p) => p.id) as string[],
      [Validators.required],
    ],
    admissionDate: [this.student.admissionDate, [Validators.required]],
  });

  get classIds() {
    return this.editStudentEnrollmentInfoForm.get('classIds') as FormControl;
  }
  get parentIds() {
    return this.editStudentEnrollmentInfoForm.get('parentIds') as FormControl;
  }
  get admissionDate() {
    return this.editStudentEnrollmentInfoForm.get(
      'admissionDate'
    ) as FormControl;
  }

  toLabelObject(obj: any[], keyId: string, keyLabel: string[]): LabelObj[] {
    return toLabelObject(obj, keyId, keyLabel);
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

  edit() {
    this.studentService
      .updateStudent(this.student.id!, {
        ...this.student,
        ...this.editStudentEnrollmentInfoForm.value,
      } as Student)
      .subscribe(() => {
        this.notificationService.notify('Student info updated successfully!');
        this.dialogRef.close();
      });
  }
}
