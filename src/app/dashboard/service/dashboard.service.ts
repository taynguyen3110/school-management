import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';

@Injectable({ providedIn: 'root' })
export class DashboardService {
    constructor(
        private apiService: ApiService
    ) { }

    getStatistic() {
        return this.apiService.get<any>('/statistics')
    }
}