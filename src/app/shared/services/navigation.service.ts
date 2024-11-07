import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { QueryService } from './query.service';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  constructor(
    private route: Router,
    private location: Location,
    private queryService: QueryService,
  ) {}

  toRoute(
    url: route,
    action?: '' | 'add' | 'delete',
    query?: Params | string[],
    replace?: boolean,
  ) {
    let params: Params = typeof query === 'object' ? query : {};
    if (query && action !== '') {
      if (action === 'add' && typeof query === 'object') {
        params = this.queryService.addToCurrentParam(query);
      }
      if (action === 'delete' && Array.isArray(query)) {
        params = this.queryService.deleteFromCurrentParam(query);
      }
    }
    this.route.navigate([url], {
      queryParams: params,
      replaceUrl: replace,
    });
  }

  goBack() {
    this.location.back();
  }

  isCurrentPathMatch(path: route) {
    return this.route.url.includes(path);
  }
}

export type route =
  | ''
  | 'students'
  | 'teachers'
  | 'parents'
  | 'subjects'
  | 'classes'
  | 'user';
