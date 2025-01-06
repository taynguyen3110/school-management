import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { HeadingComponent } from '../heading/heading.component';

@Component({
    imports: [ButtonComponent, HeadingComponent],
    selector: 'sman-page-layout',
    templateUrl: 'page-layout.component.html'
})
export class PageLayoutComponent implements OnInit {
  @Input() title: string = '';
  @Output() createNew = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}
}
