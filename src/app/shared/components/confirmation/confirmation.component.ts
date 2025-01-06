import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../button/button.component';

@Component({
    imports: [ButtonComponent],
    selector: 'sman-confirmation',
    templateUrl: 'confirmation.component.html'
})
export class ConfirmationComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      message: string;
      cancelText: string;
      confirmText: string;
      onCancel?: () => void;
      onConfirm?: () => void;
    }
  ) {}

  ngOnInit() {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
