import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  standalone: true,
  imports: [ButtonComponent],
  selector: 'sman-edit-modal',
  templateUrl: 'edit-modal.component.html',
})
export class EditModalComponent implements OnInit {
  title: any;
 
  constructor() {}

  ngOnInit() {}
}
