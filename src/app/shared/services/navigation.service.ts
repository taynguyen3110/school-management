import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NavigationService {
    constructor(
        private route: Router, 
    ) { }

    toRoute(url: route, query?: Params, replace?: boolean) {
        this.route.navigate([url], {
            queryParams: query,
            replaceUrl: replace
        })
    }

    isCurrentPathMatch(path: route) {
        return this.route.url.includes(path);
    }
}

export type route =
    '' |
    'students' |
    'teachers' |
    'parents' |
    'user'
    ;