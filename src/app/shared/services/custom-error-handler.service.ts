import { ErrorHandler, inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class CustomErrorHandler implements ErrorHandler {
    constructor(
        private snackbar: MatSnackBar
    ) { }

    handleError(error: Error): void {
        this.snackbar.open(
            `${error.name}: ${error.message}`,
            "Close",
            {
                duration: 4000
            }
        );
        console.error(error);
    }
}