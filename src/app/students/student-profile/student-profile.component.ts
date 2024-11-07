import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../shared/types';
import { StudentService } from '../service/student.service';
import { DatePipe, JsonPipe, TitleCasePipe } from '@angular/common';
import { ProfilePhotoComponent } from '../../shared/components/profile-photo/profile-photo.component';
import { ProfileInfoComponent } from "../../shared/components/profile-info/profile-info.component";
import { NavigationService } from '../../shared/services/navigation.service';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';
import { AddStudentComponent } from '../student-add/student-add.component';
import { Subject, takeUntil } from 'rxjs';
import { ProfileLayoutComponent } from "../../shared/components/profile-layout/profile-layout.component";

@Component({
    standalone: true,
    imports: [JsonPipe, TitleCasePipe, DatePipe, RouterLink, ProfilePhotoComponent, ProfileInfoComponent, AddStudentComponent, ProfileLayoutComponent],
    selector: 'sman-student-profile',
    templateUrl: 'student-profile.component.html'
})

export class StudentProfileComponent implements OnInit, OnDestroy {
    student!: Student;

    isShow: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private studentService: StudentService,
        private navigationService: NavigationService,
        private notiService: NotificationService
    ) { }

    ngOnInit() {
        this.fetchStudent();
    }

    fetchStudent() {
        const studentId = this.route.snapshot.params['id'];
        this.studentService.getStudent(studentId).subscribe((student) => {
            this.student = student
        })
    }

    showEditForm() {
        this.isShow = true;
    }

    hideEditForm() {
        this.isShow = false;
    }

    deleteStudent() {
        this.studentService.deleteStudent(this.student.id!)
            .subscribe((data) => {
                console.log(data);
                this.notiService.notify(`deleted student id: ${this.student.id}`)
                this.goBack()
            })
    }

    goBack() {
        this.navigationService.goBack();
    }

    ngOnDestroy(): void {
    }
}