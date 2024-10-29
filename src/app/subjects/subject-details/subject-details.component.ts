import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Teacher } from '../../shared/types';
import { Location } from '@angular/common';
import { TeacherService } from '../services/subject.service';
import { ItemTableComponent } from '../../shared/components/item-table/item-table.component';
import { StudentService } from '../../students/service/student.service';

@Component({
    standalone: true,
    imports: [ItemTableComponent],
    selector: 'sman-teacher-profile',
    templateUrl: 'teacher-profile.component.html'
})

export class TeacherProfileComponent implements OnInit {
    teacher: Teacher | null = null;

    constructor(
        private route: ActivatedRoute,
        private teacherService: TeacherService,
        private location: Location
    ) { }

    ngOnInit() {
        this.fetchTeacher();
    }

    fetchTeacher() {
        const teacherId = this.route.snapshot.params['id'];
        if (teacherId) {
            this.teacherService.getTeacher(teacherId).subscribe((teacher) => {
                this.teacher = teacher
            })
        }
    }

    goBack() {
        this.location.back();
    }
}