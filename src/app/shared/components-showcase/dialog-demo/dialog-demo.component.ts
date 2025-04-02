import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'sman-dialog-demo',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ButtonComponent],
  template: `
    <div class="p-6">
      <h2 class="text-xl font-semibold mb-4">{{ data.title }}</h2>
      <p class="text-gray-600 mb-6">{{ data.message }}</p>
      <div class="flex justify-end gap-4">
        <sman-button
          text="Cancel"
          btnType="cancel"
          (buttonClick)="onCancel()">
        </sman-button>
        <sman-button
          text="Confirm"
          btnType="primary"
          (buttonClick)="onConfirm()">
        </sman-button>
      </div>
    </div>
  `
})
export class DialogDemoComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogDemoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
} 