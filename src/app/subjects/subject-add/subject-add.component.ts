import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PhotoUploaderComponent } from '../../shared/components/photouploader/photo-uploader.component';
import { FormService } from '../../shared/services/form.service';
import { SubjectService } from '../services/subject.service';
import { NotificationService } from '../../shared/services/notification.service';
import { AddNewFormLayoutComponent } from '../../shared/components/addnew-form-layout/addnew-form-layout';
import { InputComponent } from "../../shared/components/input/input.component";
import { MultiSelectorComponent } from "../../shared/components/multiselector/multiselector.component";
import { toLabelObject } from '../../shared/components/multiselector/utils/toLabelObject';
import { TeacherService } from '../../teachers/services/teacher.service';
import { ClassesService } from '../../school-classes/services/classes.service';
import { SchoolSubject, LabelObj } from '../../shared/types';

@Component({
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, PhotoUploaderComponent, AddNewFormLayoutComponent, InputComponent, MultiSelectorComponent],
    selector: 'sman-add-subject',
    templateUrl: 'subject-add.component.html',
})

export class AddSubjectComponent implements OnInit {
    @Input() isEdit: boolean = false;
    @Input() subject!: SchoolSubject;

    @Output() cancelForm = new EventEmitter()

    classList: LabelObj[] = [];
    weekDays: LabelObj[] = [
        { id: 'monday', label: 'Monday' },
        { id: 'tuesday', label: 'Tuesday' },
        { id: 'wednesday', label: 'Wednesday' },
        { id: 'thursday', label: 'Thursday' },
        { id: 'friday', label: 'Friday' }
    ];
    teacherList: LabelObj[] = [];


    constructor(
        private fb: FormBuilder,
        public formService: FormService,
        private subjectService: SubjectService,
        private teacherService: TeacherService,
        private classesService: ClassesService,
        private notificationService: NotificationService,
    ) { }

    addSubjectForm = this.fb.group({
        name: ['', [
            Validators.required,
        ]],
        classId: ['', [
            Validators.required,
        ]],
        daysOfWeek: [[] as string[], [
            Validators.required,
        ]],
        teacherId: ['', [
            Validators.required,
        ]]
    })

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
        if (this.isEdit) {
            this.patchSubjectInfo()
        }
    }

    patchSubjectInfo() {
        const { id, ...values } = this.subject;
        this.addSubjectForm.setValue(values as any);
    }

    cancelAddForm() {
        this.cancelForm.emit()
    }

    lookUpClassesByName(name: string) {
        this.classesService.lookUpByName(name)
            .subscribe((data) => {
                this.classList = toLabelObject(data.classes, 'id', ['name']);
            })
    }

    handleSelectClass(selectedClass: string[] | string) {
        this.classId.setValue(selectedClass as string);
    }

    lookUpTeachersByName(name: string) {
        this.teacherService.lookUpByName(name)
            .subscribe((data) => {
                this.teacherList = toLabelObject(data.teachers, 'id', ['firstName', 'lastName']);
            })
    }

    handleSelectTeacher(selectedTeacher: string[] | string) {
        this.teacherId.setValue(selectedTeacher as string);
    }

    handleSelectSchedule(selectedDays: string[] | string) {
        this.daysOfWeek.setValue(selectedDays);
    }

    addSubject(e: Event) {
        e.preventDefault();
        this.subjectService.addSubject(this.addSubjectForm.value as SchoolSubject).subscribe(() => {
            this.cancelAddForm();
            this.notificationService.notify('Subject added successfully!')
        })
    }

    editSubject = (e: Event) => {
        e.preventDefault();
        this.subjectService.updateSubject(this.subject.id!, this.addSubjectForm.value as SchoolSubject)
            .subscribe(() => {
                this.cancelAddForm();
                this.notificationService.notify('Subject updated successfully!')
            })
    }
}