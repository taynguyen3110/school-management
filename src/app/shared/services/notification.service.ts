import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private snackbar: MatSnackBar) {}

  notify(msg: string) {
    this.snackbar.open(msg, 'Close', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-notification'],
    });
  }
}
