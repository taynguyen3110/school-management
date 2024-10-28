import { CommonModule, TitleCasePipe } from '@angular/common';
import { AfterContentInit, Component, ContentChild, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { AccordionButtonComponent } from "../accordion-button/accordion-button.component";
import { route } from '../../../services/navigation.service';
import { Params } from '@angular/router';

@Component({
    standalone: true,
    imports: [CommonModule, AccordionButtonComponent, TitleCasePipe],
    selector: 'sman-accordion-item',
    templateUrl: 'accordion-item.component.html'
})

export class AccordionItemComponent implements AfterContentInit {
    isAccordion: boolean = false;

    @ContentChild(AccordionButtonComponent) accordionBtns: AccordionButtonComponent | undefined;

    @Input() isShow: boolean = false;
    @Input() title: string = '';
    @Input() navToMenu?: (url: route, params: Params, backToRoot: boolean) => void
    @Output() selectMenu = new EventEmitter<string>();

    constructor() { }

    toggleAccordion() {
        if (this.title === 'dashboard') {
            this.selectMenu.emit('');
        } else {
            this.selectMenu.emit(this.title);
        }
        if (this.isAccordion) {
            this.isShow = !this.isShow;
        }
        if (!this.isAccordion && this.navToMenu) {
            this.navToMenu('', {}, true)
        }
    }

    ngAfterContentInit() {
        if (this.accordionBtns) {
            this.isAccordion = true;
        }
    }
}