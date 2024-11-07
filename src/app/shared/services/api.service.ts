import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:3001/api';

  post<T>(endpoint: string, data: any) {
    return this.http.post<T>(this.baseUrl + endpoint, data);
  }

  get<T>(endpoint: string, params?: Params) {
    return this.http.get<T>(this.baseUrl + endpoint, { params });
  }

  delete<T>(endpoint: string) {
    return this.http.delete<void>(this.baseUrl + endpoint);
  }
}
