import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../shared/types';
import { StudentService } from '../service/student.service';
import { Location } from '@angular/common';

@Component({
    standalone: true,
    imports: [],
    selector: 'sman-student-profile',
    templateUrl: 'student-profile.component.html'
})

export class StudentProfileComponent implements OnInit {
    student!: Student;
    // loaded: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private studentService: StudentService,
        private location: Location
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe((param) => {
            let studentId = param.get('id')
            if (studentId) {
                this.studentService.getStudent(studentId).subscribe((student) => {
                    this.student = student
                    // this.loaded = true;
                })
            }
        })
    }

    goBack() {
        this.location.back();
    }
}