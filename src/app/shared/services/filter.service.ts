import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class QueryService {
    constructor(private route: ActivatedRoute) { }

    setParam(currentParams: Params, param: { [key: string]: string | number }) {
        const newParams = { ...currentParams, ...param };
        return newParams;
    }

    deleteParam(currentParams: Params, key: string) {
        const newParams = { ...currentParams };
        delete newParams[key];
        return newParams;
    }

    isParamExist(currentParams: Params, key: string) {
        return !!currentParams[key];
    }

    addToCurrentParam(param: { [key: string]: string | number } | Params) {
        const currentParams = this.route.snapshot.queryParams;
        return this.setParam(currentParams, param);
    }

    deleteFromCurrentParam(key: string) {
        const currentParams = this.route.snapshot.queryParams;
        return this.deleteParam(currentParams, key);
    }
}