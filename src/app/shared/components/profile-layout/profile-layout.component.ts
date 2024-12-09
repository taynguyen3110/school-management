import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HeadingComponent } from '../heading/heading.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  standalone: true,
  imports: [HeadingComponent, ButtonComponent],
  selector: 'sman-profile-layout',
  templateUrl: 'profile-layout.component.html',
})
export class ProfileLayoutComponent implements OnInit {
  @Input() title: string = '';
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

}
