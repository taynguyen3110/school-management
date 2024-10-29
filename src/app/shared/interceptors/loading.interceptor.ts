import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { debounce, debounceTime, finalize, Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    constructor(private loadingService: LoadingService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingService.isLoading();
        return next.handle(req).pipe(
            finalize(() => {
                this.loadingService.isLoaded();
            })
        );

        // return new Observable<HttpEvent<any>>(observer => {
        //     setTimeout(() => {
        //         next.handle(req).pipe(
        //             finalize(() => {
        //                 this.loadingService.isLoaded();
        //             })
        //         ).subscribe(observer); 
        //     }, 30000); 
        // });
    }
}