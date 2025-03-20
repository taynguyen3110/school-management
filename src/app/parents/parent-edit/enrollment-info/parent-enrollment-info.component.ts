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
import { NotificationService } from '@/app/shared/services/notification.service';
import { StudentService } from '@/app/students/service/student.service';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';

@Component({
  imports: [
    CommonModule,
    AddNewFormLayoutComponent,
    MultiSelectorComponent,
    ReactiveFormsModule,
  ],
  selector: 'sman-parent-enrollment-info',
  templateUrl: 'parent-enrollment-info.component.html',
})
export class ParentEnrollmentInfoComponent implements OnInit {
  formChanged: boolean = false;

  studentsList: LabelObj[] = [];
  editRemoveIds: string[] = [];
  editAddIds: string[] = [];

  constructor(
    public formService: FormService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public parent: any,
    private studentService: StudentService,
    public dialogRef: MatDialogRef<ParentEnrollmentInfoComponent>,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.editParentEnrollmentInfoForm.valueChanges.subscribe(() => {
      this.formChanged = this.checkFormChange();
    });
  }

  editParentEnrollmentInfoForm = this.fb.group({
    studentIds: [
      this.parent.students?.map((p: any) => p.id) as string[],
      [Validators.required],
    ],
  });

  get studentIds() {
    return this.editParentEnrollmentInfoForm.get('studentIds') as FormControl;
  }

  toLabelObject(obj: any[], keyId: string, keyLabel: string[]): LabelObj[] {
    return toLabelObject(obj, keyId, keyLabel);
  }

  lookUpStudentsByName(name: string) {
    this.studentService.lookUpByName(name).subscribe((data) => {
      this.studentsList = toLabelObject(data.students, 'id', [
        'firstName',
        'lastName',
      ]);
    });
  }

  handleSelectStudents(selectedStudents: string[] | string) {
    if (Array.isArray(selectedStudents)) {
      this.studentIds.setValue(selectedStudents);
    }
  }

  checkFormChange() {
    const existIds: string[] = this.parent.students.map((s: Student) => s.id);
    return !(
      existIds.every((id) => this.studentIds.value.includes(id)) &&
      this.studentIds.value.every((id: string) => existIds.includes(id))
    );
  }

  initAddRemoveList() {
    this.editAddIds = [];
    this.editRemoveIds = [];
    this.parent.students.forEach((student: Student) => {
      if (!this.studentIds.value.includes(student.id!)) {
        this.editRemoveIds.push(student.id!);
      }
    });
    this.studentIds.value.forEach((id: string) => {
      if (!this.parent.students.includes(id)) {
        this.editAddIds.push(id);
      }
    });
  }

  edit() {
    this.initAddRemoveList();
    if (this.formChanged) {
      let obsArr: Observable<any>[] = [];
      this.editRemoveIds.forEach((removeStudentId) => {
        const targetStudent: Student = this.parent.students.find(
          (s: Student) => s.id === removeStudentId
        );
        obsArr.push(
          this.studentService.updateStudent(removeStudentId, {
            ...targetStudent,
            parentIds: targetStudent.parentIds.filter(
              (p) => p !== this.parent.id
            ),
          })
        );
      });
      const addOperations$ = forkJoin(
        this.editAddIds.map((addStudentId) =>
          this.studentService.getStudent(addStudentId).pipe(
            map((student) =>
              this.studentService.updateStudent(addStudentId, {
                ...student,
                parentIds: [...student.parentIds, this.parent.id],
              })
            )
          )
        )
      ).pipe(
        map((updateStudentObservables) => {
          obsArr.push(...updateStudentObservables);
        })
      );
      addOperations$.subscribe(() => {
        forkJoin(obsArr)
          .pipe(
            catchError((error) => {
              this.notificationService.notify(
                'An error occurred during edit operations'
              );
              console.error('An error occurred during edit operations:', error);
              return of([]);
            })
          )
          .subscribe(() => {
            this.notificationService.notify(
              'Parent info updated successfully!'
            );
            this.dialogRef.close();
          });
      });
    }
  }
}
