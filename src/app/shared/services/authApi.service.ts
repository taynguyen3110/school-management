import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AuthState, UserProfile } from '../types';

@Injectable({ providedIn: 'root' })
export class AuthApiService {

    constructor(private api: ApiService) { }

    login(username: string, password: string) {
        return this.api.post<AuthState>("/login", { username, password });
    }

    refreshAuthState(refreshToken: string) {
        return this.api.post<AuthState>("/refresh-token", { refreshToken });
    }

    getAccount() {
        return this.api.get<UserProfile>("/account");
    }

    updateAccount(user: UserProfile) {
        return this.api.post<UserProfile>("/account", user);
    }
}