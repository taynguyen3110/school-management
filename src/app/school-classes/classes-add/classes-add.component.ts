import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PhotoUploaderComponent } from '../../shared/components/photouploader/photo-uploader.component';
import { FormService } from '../../shared/services/form.service';
import { ClassesService } from '../services/classes.service';
import { Classes, LabelObj, Student, Teacher } from '../../shared/types';
import { NotificationService } from '../../shared/services/notification.service';
import { PageLayoutComponent } from '../../shared/components/page-layout/page-layout.component';
import { AddNewFormLayoutComponent } from '../../shared/components/addnew-form-layout/addnew-form-layout';
import { InputComponent } from "../../shared/components/input/input.component";
import { MultiSelectorComponent } from "../../shared/components/multiselector/multiselector.component";
import { StudentService } from '../../students/service/student.service';
import { toLabelObject } from '../../shared/components/multiselector/utils/toLabelObject';

@Component({
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, PhotoUploaderComponent, AddNewFormLayoutComponent, InputComponent, MultiSelectorComponent],
    selector: 'sman-add-class',
    templateUrl: 'classes-add.component.html'
})

export class AddClassComponent implements OnInit {
    @Input() isEdit: boolean = false;
    @Input() classes!: Classes;

    @Output() cancelForm = new EventEmitter()

    studentList: LabelObj[] = [];

    constructor(
        private fb: FormBuilder,
        public formService: FormService,
        private classesService: ClassesService,
        private studentService: StudentService,
        private notificationService: NotificationService
    ) { }

    addClassForm = this.fb.group({
        name: ['', [
            Validators.required,
        ]],
        studentIds: [[] as string[], [
            Validators.required,
        ]],
    })

    get name() {
        return this.addClassForm.get('name') as FormControl;
    }
    get studentIds() {
        return this.addClassForm.get('studentIds') as FormControl;
    }

    ngOnInit() {
        if (this.isEdit) {
            this.patchClassInfo()
        }
    }

    patchClassInfo() {
        const { id, ...values } = this.classes;
        this.addClassForm.setValue(values as any);
    }

    cancelAddForm() {
        this.cancelForm.emit()
    }

    lookUpStudentsByName(name: string) {
        this.studentService.lookUpByName(name)
            .subscribe((data) => {
                this.studentList = toLabelObject(data.students, 'id', ['firstName', 'lastName']);
            })
    }

    handleSelectStudent(selectedStudents: string[] | string) {
        this.studentIds.setValue(selectedStudents as string[]);
    }

    addClass(e: Event) {
        e.preventDefault();
        this.classesService.addClass(this.addClassForm.value as Classes).subscribe(() => {
            this.cancelAddForm();
            this.notificationService.notify('Class added successfully!')
        })
    }

    editClass(e: Event) {
        e.preventDefault();
        this.classesService.updateClass(this.classes.id!, this.addClassForm.value as Classes)
            .subscribe(() => {
                this.cancelAddForm();
                this.notificationService.notify('Class updated successfully!')
            })
    }
}