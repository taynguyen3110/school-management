import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    standalone: true,
    imports: [],
    selector: 'accordion-button',
    templateUrl: 'accordion-button.component.html'
})

export class AccordionButtonComponent {
    @Input() title: string = '';
    @Output() select = new EventEmitter<void>()
    constructor() { }

    handleClick() {
        this.select.emit();
    }
}