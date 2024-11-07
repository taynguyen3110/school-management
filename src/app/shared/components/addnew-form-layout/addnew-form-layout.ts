import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    standalone: true,
    imports: [ReactiveFormsModule, TitleCasePipe],
    selector: 'sman-add-form-layout',
    templateUrl: 'addnew-form-layout.component.html'
})

export class AddNewFormLayoutComponent implements OnInit {
    @Input() title: string = '';
    @Input() layout: 'add' | 'edit' = 'add';
    @Input() formGroup: FormGroup = new FormGroup({});
    @Output() submit = new EventEmitter<Event>()
    @Output() cancel = new EventEmitter<void>()

    constructor() { }

    ngOnInit() { }

    submitForm(e: Event) {
        this.submit.emit(e);
    }

    cancelForm() {
        this.cancel.emit();
    }
}