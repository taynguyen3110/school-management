import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PhotoUploaderComponent } from '../../shared/components/photouploader/photo-uploader.component';
import { FormService } from '../../shared/services/form.service';
import { TeacherService } from '../services/subject.service';
import { Teacher } from '../../shared/types';

@Component({
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, PhotoUploaderComponent],
    selector: 'sman-add-teacher',
    templateUrl: 'teacher-add.component.html'
})

export class AddTeacherComponent implements OnInit {
    @Output() cancel = new EventEmitter()

    constructor(
        private fb: FormBuilder,
        public formService: FormService,
        private teacherService: TeacherService
    ) { }

    addTeacherForm = this.fb.group({
        firstName: ['', [
            Validators.required,
        ]],
        lastName: ['', [
            Validators.required,
        ]],
        address: ['', [
            Validators.required,
        ]],
        gender: ['', [
            Validators.required,
        ]],
        phone: ['', [
            Validators.required,
        ]],
        email: ['', [
            Validators.required,
        ]],
        profileUrl: ['', [
            Validators.required,
        ]],
        admissionDate: ['', [
            Validators.required,
        ]],
    })

    get firstName() {
        return this.addTeacherForm.get('firstName') as FormControl;
    }
    get lastName() {
        return this.addTeacherForm.get('lastName') as FormControl;
    }
    get address() {
        return this.addTeacherForm.get('address') as FormControl;
    }
    get gender() {
        return this.addTeacherForm.get('gender') as FormControl;
    }
    get phone() {
        return this.addTeacherForm.get('phone') as FormControl;
    }
    get email() {
        return this.addTeacherForm.get('email') as FormControl;
    }
    get profileUrl() {
        return this.addTeacherForm.get('profileUrl') as FormControl;
    }
    get admissionDate() {
        return this.addTeacherForm.get('admissionDate') as FormControl;
    }

    choosePhoto(photoUrl: string) {
        this.profileUrl.setValue(photoUrl);
    }

    cancelAddParent() {
        this.cancel.emit()
    }

    addParent(e: Event) {
        e.preventDefault();
        this.teacherService.addTeacher(this.addTeacherForm.value as Teacher).subscribe(() => {
            this.cancelAddParent();
        })
    }

    ngOnInit() { }
}