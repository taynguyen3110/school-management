import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    private loadingService = inject(LoadingService);

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
        //                 // Notify that loading has finished
        //                 this.loadingService.isLoaded();
        //             })
        //         ).subscribe(observer); // Subscribe to the observable and emit the events
        //     }, 3000); // Delay for 1 second
        // });
    }
}