import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ContentChild, ElementRef, Input } from '@angular/core';
import { AccordionButtonComponent } from "../accordion-button/accordion-button.component";

@Component({
    standalone: true,
    imports: [CommonModule, AccordionButtonComponent],
    selector: 'sman-accordion-item',
    templateUrl: 'accordion-item.component.html'
})

export class AccordionItemComponent implements AfterContentInit {
    isAccordion: boolean = false;

    @ContentChild(AccordionButtonComponent) accordionBtns: AccordionButtonComponent | undefined;

    isShow: boolean = false;

    constructor() { }

    toggleAccordion() {
        this.isShow = !this.isShow;
    }

    ngAfterContentInit() {
        if (this.accordionBtns) {
            this.isAccordion = true;
        }
    }
}