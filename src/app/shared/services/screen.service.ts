import { Injectable } from '@angular/core';
import { distinctUntilChanged, map, Observable, Subject, takeUntil } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ScreenSize } from '../types';

@Injectable({ providedIn: 'root' })
export class ScreenService {
  breakpoints = {
    xs: '(max-width: 639px)',
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    xxl: '(min-width: 1536px)',
  };

  unsubscribe$ = new Subject<void>();

  constructor(private breakpointObserver: BreakpointObserver) {}

  observeScreen(size: ScreenSize): Observable<boolean> {
    const query = this.breakpoints[size];
    if (!query) {
      console.error(`Breakpoint "${size}" is not defined.`);
      return new Observable<boolean>((observer) => observer.next(false));
    }
    return this.breakpointObserver.observe(query).pipe(
      takeUntil(this.unsubscribe$),
      map((result) => result.matches),
      distinctUntilChanged()
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
