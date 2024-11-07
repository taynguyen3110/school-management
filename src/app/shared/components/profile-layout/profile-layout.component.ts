import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    standalone: true,
    imports: [],
    selector: 'sman-profile-layout',
    templateUrl: 'profile-layout.component.html'
})

export class ProfileLayoutComponent implements OnInit {
    @Output() edit = new EventEmitter<void>();
    @Output() delete = new EventEmitter<void>();
    @Output() back = new EventEmitter<void>();

    constructor() { }

    ngOnInit() { }

    onEdit() {
        this.edit.emit()
    }

    onDelete() {
        this.delete.emit()
    }

    onBack() {
        this.back.emit()
    }
}