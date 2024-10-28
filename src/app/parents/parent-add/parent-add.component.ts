import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PhotoUploaderComponent } from '../../shared/components/photouploader/photo-uploader.component';
import { FormService } from '../../shared/services/form.service';
import { ParentsService } from '../services/parents.service';
import { Parent } from '../../shared/types';

@Component({
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, PhotoUploaderComponent],
    selector: 'sman-add-parent',
    templateUrl: 'parent-add.component.html'
})

export class AddParentComponent implements OnInit {
    @Output() cancel = new EventEmitter()

    constructor(
        private fb: FormBuilder,
        public formService: FormService,
        private parentService: ParentsService
    ) { }

    addParentForm = this.fb.group({
        firstName: ['', [
            Validators.required,
        ]],
        lastName: ['', [
            Validators.required,

        ]],
        address: ['', [
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
    })

    get firstName() {
        return this.addParentForm.get('firstName') as FormControl;
    }
    get lastName() {
        return this.addParentForm.get('lastName') as FormControl;
    }
    get address() {
        return this.addParentForm.get('address') as FormControl;
    }
    get phone() {
        return this.addParentForm.get('phone') as FormControl;
    }
    get email() {
        return this.addParentForm.get('email') as FormControl;
    }
    get profileUrl() {
        return this.addParentForm.get('profileUrl') as FormControl;
    }

    choosePhoto(photoUrl: string) {
        this.profileUrl.setValue(photoUrl);
    }

    cancelAddParent() {
        this.cancel.emit()
    }

    addParent(e: Event) {
        e.preventDefault();
        this.parentService.addParent(this.addParentForm.value as Parent).subscribe(() => {
            this.cancelAddParent();
        })
    }

    ngOnInit() { }
}