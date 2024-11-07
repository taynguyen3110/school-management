import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Params } from '@angular/router';
import { Teacher } from '../../shared/types';

@Injectable({ providedIn: 'root' })
export class TeacherService {
  constructor(private apiService: ApiService) {}

  getTeachers(params?: Params) {
    return this.apiService.get<any>('/teachers', params);
  }

  getTeacher(id: string) {
    return this.apiService.get<Teacher>(`/teachers/${id}`);
  }

  lookUpByName(name: string) {
    return this.apiService.get<any>('/teachers/lookup', { name });
  }

  addTeacher(teacher: Teacher) {
    return this.apiService.post<Teacher>('/teachers/add', teacher);
  }

  updateTeacher(id: string, teacher: Teacher) {
    return this.apiService.post<Teacher>(`/teachers/${id}`, teacher);
  }

  deleteTeacher(id: string) {
    return this.apiService.delete<void>(`/teachers/${id}`);
  }
}
