import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    imports: [],
    selector: 'sman-user-icon',
    templateUrl: 'user-icon.component.html'
})

export class UserIconComponent implements OnInit {
    @Output() clickedOn = new EventEmitter<void>();
    constructor() { }

    ngOnInit() { }

    handleClick() {
        this.clickedOn.emit();
    }
}