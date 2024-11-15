import { HostListener, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  fromEvent,
  Subject,
  takeUntil,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScreenService {
  private breakpoints = {
    xs: 375,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536,
  };

  private screen = new BehaviorSubject<string>(
    this.getScreenSizeLabel(window.innerWidth)
  );
  screenSize$ = this.screen.asObservable();
  unsubscribe$ = new Subject<void>();

  constructor() {
    fromEvent(window, 'resize')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.onResize());
  }

  onResize() {
    const width = window.innerWidth;
    this.screen.next(this.getScreenSizeLabel(width));
  }

  getScreenSizeLabel(width: number): string {
    if (width >= this.breakpoints.xxl) {
      return '2xl';
    } else if (width >= this.breakpoints.xl) {
      return 'xl';
    } else if (width >= this.breakpoints.lg) {
      return 'lg';
    } else if (width >= this.breakpoints.md) {
      return 'md';
    } else if (width >= this.breakpoints.sm) {
      return 'sm';
    } else {
      return 'xs';
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
