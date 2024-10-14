import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthApiService } from '../services/authApi.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private authService = inject(AuthService);
    private authApi = inject(AuthApiService);

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authState = this.authService.authState;
        const accessToken = authState?.access.token;
        const refreshToken = authState?.refresh.token;

        if (accessToken && refreshToken && !req.url.includes('/refresh-token')) { //if not login request --> check valid within the next 5 minutes, then try authorize it
            if (this.authService.isAccessTokenExpired()) {
                if (this.authService.isRefreshTokenExpired()) {
                    this.authService.logOut();
                } else {
                    return this.authApi.refreshAuthState(refreshToken).pipe(
                        switchMap((newAuthState) => {
                            this.authService.setAuthState(newAuthState);
                            const newRequest = this.authorizeRequest(req, newAuthState.access.token);
                            return next.handle(newRequest);
                        }),
                        catchError((err) => {
                            this.authService.logOut();
                            return throwError(() => err)
                        })
                    )
                }
            } else {
                req = this.authorizeRequest(req, accessToken);
            }
        }
        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 401 && !req.url.includes('/refresh-token')) {
                        this.authService.logOut();
                    }
                    return throwError(() => error)
                })
            );
        // .pipe(
        //     catchError((error: HttpErrorResponse) => {
        //         // if unauthorize, not a refresh req, not a login req --> try to refresh token
        //         if (error.status === 401 && !req.url.includes('/refresh-token') && refreshToken) {
        //             return this.authApi.refreshAuthState(refreshToken).pipe(
        //                 switchMap((newAuthState) => {
        //                     // Update the token and retry the failed request
        //                     return next.handle(this.authorizeRequest(req, newAuthState.access.token));
        //                 }),
        //                 catchError((err) => {
        //                     // Handle refresh token failure (e.g., log out the user)
        //                     this.authService.logOut();
        //                     return throwError(() => err);
        //                 })
        //             );
        //         } else {
        //             return throwError(() => error);
        //         }
        //     })
        // );
    }

    private authorizeRequest(req: HttpRequest<any>, accessToken: string) {
        return req.clone({
            setHeaders: {
                'Authorization': `Bearer ${accessToken}`,
            }
        })
    }

}