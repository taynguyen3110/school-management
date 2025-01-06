import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PhotoUploaderComponent } from '../../shared/components/photouploader/photo-uploader.component';
import { FormService } from '../../shared/services/form.service';
import { SubjectService } from '../services/subject.service';
import { NotificationService } from '../../shared/services/notification.service';
import { AddNewFormLayoutComponent } from '../../shared/components/addnew-form-layout/addnew-form-layout.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { MultiSelectorComponent } from '../../shared/components/multiselector/multiselector.component';
import { toLabelObject } from '../../shared/components/multiselector/utils/toLabelObject';
import { TeacherService } from '../../teachers/services/teacher.service';
import { ClassesService } from '../../school-classes/services/classes.service';
import { SchoolSubject, LabelObj } from '../../shared/types';
import { MatDialogRef } from '@angular/material/dialog';
import checkFormChange from '@/app/shared/utils/checkFormChanged';

@Component({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        PhotoUploaderComponent,
        AddNewFormLayoutComponent,
        InputComponent,
        MultiSelectorComponent,
    ],
    selector: 'sman-add-subject',
    templateUrl: 'subject-add.component.html'
})
export class AddSubjectComponent implements OnInit {
  @Input() subject!: SchoolSubject;

  classList: LabelObj[] = [];
  weekDays: LabelObj[] = [
    { id: 'monday', label: 'Monday' },
    { id: 'tuesday', label: 'Tuesday' },
    { id: 'wednesday', label: 'Wednesday' },
    { id: 'thursday', label: 'Thursday' },
    { id: 'friday', label: 'Friday' },
  ];
  teacherList: LabelObj[] = [];

  isDirty: boolean = false;

  readonly dialogRef = inject(MatDialogRef<AddSubjectComponent>);

  constructor(
    private fb: FormBuilder,
    public formService: FormService,
    private subjectService: SubjectService,
    private teacherService: TeacherService,
    private classesService: ClassesService,
    private notificationService: NotificationService
  ) {}

  addSubjectForm = this.fb.group({
    name: ['', [Validators.required]],
    classId: ['', [Validators.required]],
    daysOfWeek: [[] as string[], [Validators.required]],
    teacherId: ['', [Validators.required]],
  });

  get name() {
    return this.addSubjectForm.get('name') as FormControl;
  }
  get classId() {
    return this.addSubjectForm.get('classId') as FormControl;
  }
  get daysOfWeek() {
    return this.addSubjectForm.get('daysOfWeek') as FormControl;
  }
  get teacherId() {
    return this.addSubjectForm.get('teacherId') as FormControl;
  }

  ngOnInit() {
    this.addSubjectForm.valueChanges.subscribe(() => {
      this.isDirty = checkFormChange(this.addSubjectForm);
    });
  }

  lookUpClassesByName(name: string) {
    this.classesService.lookUpByName(name).subscribe((data) => {
      this.classList = toLabelObject(data.classes, 'id', ['name']);
    });
  }

  handleSelectClass(selectedClass: string[] | string) {
    this.classId.setValue(selectedClass as string);
  }

  lookUpTeachersByName(name: string) {
    this.teacherService.lookUpByName(name).subscribe((data) => {
      this.teacherList = toLabelObject(data.teachers, 'id', [
        'firstName',
        'lastName',
      ]);
    });
  }

  handleSelectTeacher(selectedTeacher: string[] | string) {
    this.teacherId.setValue(selectedTeacher as string);
  }

  handleSelectSchedule(selectedDays: string[] | string) {
    this.daysOfWeek.setValue(selectedDays);
  }

  addSubject(e: Event) {
    e.preventDefault();
    this.subjectService
      .addSubject(this.addSubjectForm.value as SchoolSubject)
      .subscribe(() => {
        this.isDirty = false;
        this.dialogRef.close();
        this.notificationService.notify('Subject added successfully!');
      });
  }
}
