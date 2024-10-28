import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Params } from '@angular/router';
import { Parent } from '../../shared/types';

@Injectable({ providedIn: 'root' })
export class ParentsService {
    constructor(
        private apiService: ApiService
    ) { }

    getParents(params?: Params) {
        return this.apiService.get<any>('/parents', params)
    }

    getParent(id: string) {
        return this.apiService.get<Parent>(`/parents/${id}`)
    }

    lookUpByName(name: string) {
        return this.apiService.get<any>('/parents/lookup', { name })
    }

    addParent(parent: Parent) {
        return this.apiService.post<Parent>('/parents/add', parent)
    }
}