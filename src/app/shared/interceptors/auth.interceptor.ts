import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, Observable, Subject, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthApiService } from '../services/authApi.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private authApi: AuthApiService) { }

    private isRefreshing: boolean = false;
    private refeshingToken$: Subject<boolean> = new Subject();

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authState = this.authService.authState;
        const accessToken = authState?.access.token;
        const refreshToken = authState?.refresh.token;

        if (this.authService.isLoggedin && !req.url.includes('/refresh-token')) {
            if (this.authService.isAccessTokenExpired()) {
                if (this.authService.isRefreshTokenExpired()) {
                    this.authService.logOut();
                } else {
                    if (!this.isRefreshing) {
                        this.isRefreshing = true;
                        return this.authApi.refreshAuthState(refreshToken!).pipe(
                            switchMap((newAuthState) => {
                                this.authService.setAuthState(newAuthState);
                                const newRequest = this.authorizeRequest(req, newAuthState.access.token);
                                this.refeshingToken$.next(true);
                                this.isRefreshing = false;
                                return next.handle(newRequest);
                            }),
                            catchError((err) => {
                                this.refeshingToken$.next(false);
                                this.isRefreshing = false;
                                this.authService.logOut();
                                return throwError(() => err)
                            })
                        )
                    } else {
                        return this.refeshingToken$.pipe(
                            filter((succeed) => {
                                return succeed;
                            }),
                            switchMap(() => {
                                const newRequest = this.authorizeRequest(req, this.authService.authState!.access.token);
                                return next.handle(newRequest);
                            })
                        );
                    }
                }
            } else {
                req = this.authorizeRequest(req, accessToken!);
            }
        }
        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 401 && !req.url.includes('/refresh-token') && !req.url.includes('/login')) {
                        this.authService.logOut();
                    }
                    return throwError(() => error)
                })
            );
    }

    private authorizeRequest(req: HttpRequest<any>, accessToken: string) {
        return req.clone({
            setHeaders: {
                'Authorization': `Bearer ${accessToken}`,
            }
        })
    }

}