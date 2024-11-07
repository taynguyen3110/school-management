import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PhotoUploaderComponent } from '../../shared/components/photouploader/photo-uploader.component';
import { FormService } from '../../shared/services/form.service';
import { ParentsService } from '../services/parents.service';
import { Parent } from '../../shared/types';
import { InputComponent } from "../../shared/components/input/input.component";
import { NotificationService } from '../../shared/services/notification.service';
import { AddNewFormLayoutComponent } from '../../shared/components/addnew-form-layout/addnew-form-layout';

@Component({
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, PhotoUploaderComponent, InputComponent, AddNewFormLayoutComponent],
    selector: 'sman-add-parent',
    templateUrl: 'parent-add.component.html'
})

export class AddParentComponent implements OnInit {
    @Input() isEdit: boolean = false;
    @Input() parent!: Parent;

    @Output() cancel = new EventEmitter()

    constructor(
        private fb: FormBuilder,
        public formService: FormService,
        private parentService: ParentsService,
        private notificationService: NotificationService

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
        profileUrl: ['http://localhost:3001/photos/profile-picture.jpg', [
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

    ngOnInit() {
        if (this.isEdit) {
            this.patchParentInfo()
        }
    }

    patchParentInfo() {
        const { id, ...values } = this.parent;
        this.addParentForm.setValue(values as any);
    }

    choosePhoto(photoUrl: string) {
        this.profileUrl.setValue(photoUrl);
    }

    cancelAddForm = () => {
        this.cancel.emit()
    }

    addParent(e: Event) {
        e.preventDefault();
        this.parentService.addParent(this.addParentForm.value as Parent).subscribe(() => {
            this.cancelAddForm();
            this.notificationService.notify('Parent added successfully!')
        })
    }

    editParent = (e: Event) => {
        e.preventDefault();
        this.parentService.updateParent(this.parent.id!, this.addParentForm.value as Parent)
            .subscribe(() => {
                this.cancelAddForm();
                this.notificationService.notify('Parent updated successfully!')
            })
    }
}