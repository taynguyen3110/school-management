import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

// Consider using this interface for all CanDeactivate guards,
// and have your components implement this interface, too.
//
//   e.g. export class VillainsComponent implements CanComponentDeactivate { ...
//
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const CanDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component: CanComponentDeactivate
) => {
  if (component.canDeactivate()) {
    return true;
  } else {
    return false;
  }
};
