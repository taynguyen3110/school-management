import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Params } from '@angular/router';
import { SchoolSubject } from '../../shared/types';

@Injectable({ providedIn: 'root' })
export class SubjectService {
    constructor(
        private apiService: ApiService
    ) { }

    getSubjects(params?: Params) {
        return this.apiService.get<any>('/subjects', params)
    }

    getSubject(id: string) {
        return this.apiService.get<SchoolSubject>(`/subjects/${id}`)
    }

    lookUpByName(name: string) {
        return this.apiService.get<any>('/subjects/lookup', { name })
    }

    addSubject(subject: SchoolSubject) {
        return this.apiService.post<SchoolSubject>('/subjects/add', subject)
    }

    updateSubject(id: string, subject: SchoolSubject) {
        return this.apiService.post<SchoolSubject>(`/subjects/${id}`, subject)
    }

    deleteSubject(id: string) {
        return this.apiService.delete<void>(`/subjects/${id}`);
    }
}