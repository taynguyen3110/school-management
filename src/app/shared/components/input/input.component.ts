import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'sman-input',
  templateUrl: 'input.component.html',
})
export class InputComponent implements OnInit {
  @Input() group: FormGroup = new FormGroup({});
  @Input() control: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() type: string = 'text';
  @Input() pattern: string | RegExp = /.*/;
  @Input() placeholder?: string = '';
  @Input() errMsgs: { [key: string]: string } = {};

  public maxDate: string = '';

  constructor(public formService: FormService) {}

  ngOnInit() {
    if (this.type === 'date') {
      const today = new Date();
      if (this.name === 'dateOfBirth') {
        const maxDate = new Date(today.setFullYear(today.getFullYear() - 7));
        this.maxDate = maxDate.toISOString().split('T')[0];
      }
    }
  }

  get errorKeys() {
    return Object.keys(this.errMsgs);
  }
}
