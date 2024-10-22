import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../shared/types';
import { StudentService } from '../service/student.service';

@Component({
    standalone: true,
    imports: [],
    selector: 'sman-student-profile',
    templateUrl: 'student-profile.component.html'
})

export class StudentProfileComponent implements OnInit {
    // studentId!: string | null;
    student!: Student;

    constructor(
        private route: ActivatedRoute,
        private studentService: StudentService
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe((param) => {
            let studentId = param.get('id')
            if (studentId) {
                this.studentService.getStudent(studentId).subscribe((student) => {
                    this.student = student
                })
            }
        })
    }
}