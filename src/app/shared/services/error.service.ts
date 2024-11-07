import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  constructor() {}
  getErrorMessage(error: any) {
    let message = '';
    let newError: any;
    if (error instanceof HttpErrorResponse) {
      newError = error.error;
    }
    if (typeof newError === 'string') {
      message = newError;
    }
    if (typeof newError === 'object') {
      if (newError.message && typeof newError.message === 'string') {
        message = newError.message;
      }
    }
    if (!!message) {
      return message;
    } else {
      return 'Unable to handle your request!';
    }
  }
}
