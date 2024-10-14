import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
    constructor(private http: HttpClient) { }

    baseUrl = "http://localhost:3001/api";

    post<T>(endpoint: string, data: any) {
        return this.http.post<T>(this.baseUrl + endpoint, data);
    }

    get<T>(endpoint: string) {
        return this.http.get<T>(this.baseUrl + endpoint);
    }
}