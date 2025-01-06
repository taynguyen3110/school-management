import { ParentsService } from '@/app/parents/services/parents.service';
import { ClassesService } from '@/app/school-classes/services/classes.service';
import { AddNewFormLayoutComponent } from '@/app/shared/components/addnew-form-layout/addnew-form-layout.component';
import { CustomInputComponent } from '@/app/shared/components/custom-input/custom-input.component';
import { InputComponent } from '@/app/shared/components/input/input.component';
import { MultiSelectorComponent } from '@/app/shared/components/multiselector/multiselector.component';
import { toLabelObject } from '@/app/shared/components/multiselector/utils/toLabelObject';
import { FormService } from '@/app/shared/services/form.service';
import { Classes, LabelObj, SchoolSubject, Student } from '@/app/shared/types';
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
import { StudentService } from '@/app/students/service/student.service';

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
  selector: 'sman-class-edit',
  templateUrl: 'class-edit.component.html',
})
export class ClassEditComponent implements OnInit {
  formChanged: boolean = false;

  studentList: LabelObj[] = [];

  constructor(
    public formService: FormService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public classes: Classes,
    private studentService: StudentService,
    private classesService: ClassesService,
    public dialogRef: MatDialogRef<ClassEditComponent>,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.editClassInfoForm.valueChanges.subscribe(() => {
      this.formChanged = checkFormChange(this.editClassInfoForm, this.classes);
    });
  }

  editClassInfoForm = this.fb.group({
    studentIds: [this.classes.studentIds, [Validators.required]],
  });

  get studentIds() {
    return this.editClassInfoForm.get('studentIds') as FormControl;
  }

  handleSelectStudent(selectedStudent: string[] | string) {
    if (Array.isArray(selectedStudent)) {
      this.studentIds.setValue(selectedStudent);
    }
  }

  lookUpStudentsByName(name: string) {
    this.studentService.lookUpByName(name).subscribe((data) => {
      this.studentList = toLabelObject(data.students, 'id', [
        'firstName',
        'lastName',
      ]);
    });
  }

  toLabelObj(obj: any[], keyId: string, keyLabel: string[]) {
    return toLabelObject(obj, keyId, keyLabel);
  }

  edit() {
    this.classesService
      .updateClass(this.classes.id!, {
        ...this.classes,
        ...this.editClassInfoForm.value,
      } as Classes)
      .subscribe(() => {
        this.notificationService.notify('Class info updated successfully!');
        this.dialogRef.close();
      });
  }
}
