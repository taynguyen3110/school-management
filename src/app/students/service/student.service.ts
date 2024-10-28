import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Class, Student } from '../../shared/types';
import { Params } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class StudentService {
    constructor(private apiService: ApiService) { }

    getStudents(params?: Params) {
        return this.apiService.get<Student[]>("/students", params);
    }

    getStudent(id: string) {
        return this.apiService.get<Student>(`/students/${id}`);
    }

    lookUpStudentsByParent(parentId: string) {
        return this.apiService.get<Student[]>(`/students/by-parent/${parentId}`)
    }

    addStudent(student: Student) {
        return this.apiService.post<Student>("/students/add", student);
    }

    
}