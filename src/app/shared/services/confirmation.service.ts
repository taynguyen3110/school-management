import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../components/confirmation/confirmation.component';

@Injectable({ providedIn: 'root' })
export class ConfirmationService {
  constructor(readonly dialog: MatDialog) {}

  openConfirmation(
    title: string,
    message: string,
    cancelText: string,
    confirmText: string,
    onCancel?: () => void,
    onConfirm?: () => void
  ): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      maxWidth: '600px',
      width: '70vw',
      data: {
        title,
        message,
        cancelText,
        confirmText,
        onCancel,
        onConfirm,
      },
    });
    return new Promise((resolve) => {
      dialogRef.afterClosed().subscribe((result) => {
        if (result && onConfirm) {
          onConfirm();
        } else if (!result && onCancel) {
          onCancel();
        }
        resolve(result);
      });
    });
  }
}
