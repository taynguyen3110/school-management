import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'sman-button',
  templateUrl: 'button.component.html',
  styleUrl: 'button.component.scss',
})
export class ButtonComponent implements OnInit, OnChanges {
  @Input() text: string = 'Click Me';
  @Input() className: string = '';
  @Input() btnType:
    | 'primary'
    | 'secondary'
    | 'cancel'
    | 'edit'
    | 'back'
    | 'delete' = 'primary';
  @Input() isDisabled: boolean = false;
  @Output() buttonClick = new EventEmitter<Event>();

  disabled: boolean = this.isDisabled;
  constructor() {}

  ngOnChanges() {
    this.disabled = this.isDisabled;
  }

  ngOnInit() {}

  onClick(e: Event) {
    if (!this.isDisabled) {
      this.buttonClick.emit(e);
    }
  }
}
