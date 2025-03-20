import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormService } from '../../shared/services/form.service';
import { ClassesService } from '../services/classes.service';
import { Classes, LabelObj } from '../../shared/types';
import { NotificationService } from '../../shared/services/notification.service';
import { AddNewFormLayoutComponent } from '../../shared/components/addnew-form-layout/addnew-form-layout.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { MultiSelectorComponent } from '../../shared/components/multiselector/multiselector.component';
import { StudentService } from '../../students/service/student.service';
import { toLabelObject } from '../../shared/components/multiselector/utils/toLabelObject';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AddNewFormLayoutComponent,
    InputComponent,
    MultiSelectorComponent,
  ],
  selector: 'sman-add-class',
  templateUrl: 'classes-add.component.html',
})
export class AddClassComponent implements OnInit {
  @Input() classes!: Classes;

  studentList: LabelObj[] = [];
  isDirty: boolean = false;

  readonly dialogRef = inject(MatDialogRef<AddClassComponent>);

  constructor(
    private fb: FormBuilder,
    public formService: FormService,
    private classesService: ClassesService,
    private studentService: StudentService,
    private notificationService: NotificationService
  ) {}

  addClassForm = this.fb.group({
    name: ['', [Validators.required]],
    studentIds: [[] as string[], [Validators.required]],
  });

  get name() {
    return this.addClassForm.get('name') as FormControl;
  }
  get studentIds() {
    return this.addClassForm.get('studentIds') as FormControl;
  }

  ngOnInit() {
    this.addClassForm.valueChanges.subscribe(() => {
      this.isDirty = this.addClassForm.dirty;
    });
  }

  lookUpStudentsByName(name: string) {
    this.studentService.lookUpByName(name).subscribe((data) => {
      this.studentList = toLabelObject(data.students, 'id', [
        'firstName',
        'lastName',
      ]);
    });
  }

  handleSelectStudent(selectedStudents: string[] | string) {
    this.studentIds.markAsDirty();
    this.studentIds.setValue(selectedStudents as string[]);
  }

  addClass(e: Event) {
    e.preventDefault();
    this.classesService
      .addClass(this.addClassForm.value as Classes)
      .subscribe(() => {
        this.isDirty = false;
        this.dialogRef.close();
        this.notificationService.notify('Class added successfully!');
      });
  }
}
