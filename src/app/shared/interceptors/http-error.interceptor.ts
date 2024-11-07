import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';
        if (error.status === 0) {
          errorMessage =
            'Network error: Please check your internet connection.';
        } else if (error.status >= 400 && error.status < 500) {
          errorMessage =
            error.error?.message || 'Request failed. Please try again.';
        } else if (error.status >= 500) {
          errorMessage = 'Server error: Please try again later.';
        }

        this.notificationService.notify(errorMessage);

        return throwError(() => error);
      }),
    );
  }
}
