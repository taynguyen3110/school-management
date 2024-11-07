import {
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomErrorHandler } from './shared/services/custom-error-handler.service';
import { HttpErrorInterceptor } from './shared/interceptors/http-error.interceptor';
import { GoogleChartsModule } from 'angular-google-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    provideAnimationsAsync(),
    importProvidersFrom(),
    // MatSnackBarModule,
    // { provide: ErrorHandler, useClass: CustomErrorHandler }
  ],
};
