import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Student } from '../../shared/types';
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

    lookUpByName(name: string) {
        return this.apiService.get<any>('/students/lookup', { name })
    }

    lookUpStudentsByParent(parentId: string) {
        return this.apiService.get<Student[]>(`/students/by-parent/${parentId}`)
    }

    addStudent(student: Student) {
        return this.apiService.post<Student>("/students/add", student);
    }

    updateStudent(id: string, student: Student) {
        return this.apiService.post<Student>(`/students/${id}`, student)
    }

    deleteStudent(id: string) {
        return this.apiService.delete<void>(`/students/${id}`);
    }


}