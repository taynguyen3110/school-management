import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Params } from '@angular/router';
import { Classes } from '../../shared/types';

@Injectable({ providedIn: 'root' })
export class ClassesService {
  constructor(private apiService: ApiService) {}

  getClasses(params?: Params) {
    return this.apiService.get<any>('/classes', params);
  }

  getClass(id: string) {
    return this.apiService.get<Classes>(`/classes/${id}`);
  }

  lookUpByName(name: string) {
    return this.apiService.get<any>('/classes/lookup', { name });
  }

  addClass(classes: Classes) {
    return this.apiService.post<Classes>('/classes/add', classes);
  }

  updateClass(id: string, classes: Classes) {
    return this.apiService.post<Classes>(`/classes/${id}`, classes);
  }

  deleteClass(id: string) {
    return this.apiService.delete<void>(`/classes/${id}`);
  }
}
