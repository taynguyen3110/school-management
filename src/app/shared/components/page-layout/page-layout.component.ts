import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { HeadingComponent } from '../heading/heading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  imports: [ButtonComponent, HeadingComponent, MatProgressSpinnerModule],
  selector: 'sman-page-layout',
  templateUrl: 'page-layout.component.html',
})
export class PageLayoutComponent implements OnInit {
  @Input() title: string = '';
  @Input() isLoading: boolean = false;
  @Output() createNew = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}
}
