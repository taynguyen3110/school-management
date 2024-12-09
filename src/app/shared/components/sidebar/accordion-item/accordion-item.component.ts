import { CommonModule, TitleCasePipe } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { AccordionButtonComponent } from '../accordion-button/accordion-button.component';
import { Params } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, AccordionButtonComponent, TitleCasePipe],
  selector: 'sman-accordion-item',
  templateUrl: 'accordion-item.component.html',
})
export class AccordionItemComponent implements AfterContentInit {
  isAccordion: boolean = false;

  @ContentChild(AccordionButtonComponent) accordionBtns:
    | AccordionButtonComponent
    | undefined;

  @Input() isShow: boolean = false;
  @Input() title: string = '';
  @Output() selectMenu = new EventEmitter<string>();

  constructor() {}

  toggleAccordion() {
    if (this.title === 'dashboard') {
      this.selectMenu.emit('');
    } else {
      this.selectMenu.emit(this.title);
    }
    if (this.isAccordion) {
      this.isShow = !this.isShow;
    }
  }

  ngAfterContentInit() {
    if (this.accordionBtns) {
      this.isAccordion = true;
    }
  }
}
