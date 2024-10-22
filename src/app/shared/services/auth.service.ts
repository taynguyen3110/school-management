import { Injectable } from '@angular/core';
import { AuthState } from '../types';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor() {
        const localState = localStorage.getItem("authState");
        if (localState && localState !== undefined) {
            this._authState = JSON.parse(localState);
        }
    }

    private _authState?: AuthState;
    
    public get isLoggedin() {
        return !!this._authState;
    }

    public get authState() {
        return this._authState;
    }

    setAuthState(authState: AuthState): void {
        this._authState = authState;
        localStorage.setItem("authState", JSON.stringify(this._authState));
    }

    logOut(): void {
        localStorage.removeItem("authState");
        this._authState = undefined;
    }

    isAccessTokenExpired(): boolean {
        const currentTime = Date.now();
        const expTime = new Date(this.authState!.access.expires).getTime();
        return expTime - currentTime < 300000;
    }

    isRefreshTokenExpired(): boolean {
        const currentTime = Date.now();
        const expTime = new Date(this.authState!.refresh.expires).getTime();
        return expTime - currentTime < 300000;
    }
}

