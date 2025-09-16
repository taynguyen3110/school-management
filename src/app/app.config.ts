import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { HttpErrorInterceptor } from './shared/interceptors/http-error.interceptor';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideStore } from '@ngrx/store';
import { studentsReducer } from './state/student/student.reducer';
import { parentsReducer } from './state/parent/parent.reducer';
import { teachersReducer } from './state/teacher/teacher.reducer';
import { subjectsReducer } from './state/subject/subject.reducer';
import { classesReducer } from './state/class/class.reducer';
import { NgrokHeaderInterceptor } from './shared/interceptors/ngrok-header.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: NgrokHeaderInterceptor, multi: true },
    provideAnimationsAsync(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-au' },
    // { provide: ErrorHandler, useClass: CustomErrorHandler },
    provideStore({
      students: studentsReducer,
      parents: parentsReducer,
      teachers: teachersReducer,
      subjects: subjectsReducer,
      classes: classesReducer,
    }),
  ],
};
