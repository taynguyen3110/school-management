import { CommonModule, TitleCasePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmationService } from '../../services/confirmation.service';
import { Subscription } from 'rxjs';

@Component({
  imports: [ReactiveFormsModule, TitleCasePipe, CommonModule, ButtonComponent],
  selector: 'sman-add-form-layout',
  templateUrl: 'addnew-form-layout.component.html',
})
export class AddNewFormLayoutComponent implements OnInit, OnChanges {
  @Input() title: string = '';
  @Input() isDirty: boolean = false;
  @Input() dialogRef!: MatDialogRef<any>;
  @Input() layout: 'add' | 'edit' = 'add';
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() disableSubmit: boolean = false;
  @Output() submit = new EventEmitter<Event>();

  subscription: Subscription | null = null;

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: Event) {
    if (this.isDirty) {
      event.preventDefault();
      event.returnValue = true;
    }
  }

  constructor(private confirmationService: ConfirmationService) {}

  ngOnChanges() {
    if (this.dialogRef && !this.subscription) {
      this.subscription = this.dialogRef.backdropClick().subscribe(() => {
        this.cancelForm();
      });
    }
  }

  ngOnInit() {}

  confirmClose() {
    this.confirmationService.openConfirmation(
      'Are you sure to close this dialog?',
      'There are unsaved changes!',
      'No',
      'Yes',
      () => {},
      () => {
        this.isDirty = true;
        this.dialogRef.close();
      }
    );
  }

  submitForm(e: Event) {
    this.submit.emit(e);
  }

  cancelForm(e?: Event) {
    e?.preventDefault();
    if (this.isDirty && !this.disableSubmit) {
      this.confirmClose();
    } else {
      this.dialogRef.close();
    }
  }
}
