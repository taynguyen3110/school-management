import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';

@Component({
    imports: [ButtonComponent, CommonModule],
    selector: 'sman-info-wrapper',
    templateUrl: 'information-wrapper.component.html'
})
export class InformationWrapperComponent implements OnInit {
  @Input() profilePic: boolean = false;
  @Output() edit = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

}
