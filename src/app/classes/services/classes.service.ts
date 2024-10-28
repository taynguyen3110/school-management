import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Class } from '../../shared/types';

@Injectable({ providedIn: 'root' })
export class ClassesService {
    constructor(
        private apiService: ApiService
    ) { }

    getClasses() {
        return this.apiService.get<Class[]>("/classes/lookup")
    }

    lookUpByName(name: string) {
        return this.apiService.get<any>('/classes/lookup', { name });
    }
}