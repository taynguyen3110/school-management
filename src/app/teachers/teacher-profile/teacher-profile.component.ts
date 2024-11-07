import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Teacher } from '../../shared/types';
import { DatePipe, Location, TitleCasePipe } from '@angular/common';
import { TeacherService } from '../services/teacher.service';
import { ItemTableComponent } from '../../shared/components/item-table/item-table.component';
import { StudentService } from '../../students/service/student.service';
import { NavigationService } from '../../shared/services/navigation.service';
import { NotificationService } from '../../shared/services/notification.service';
import { AddStudentComponent } from "../../students/student-add/student-add.component";
import { AddTeacherComponent } from "../teacher-add/teacher-add.component";
import { ProfileLayoutComponent } from "../../shared/components/profile-layout/profile-layout.component";
import { ProfilePhotoComponent } from "../../shared/components/profile-photo/profile-photo.component";
import { ProfileInfoComponent } from "../../shared/components/profile-info/profile-info.component";

@Component({
    standalone: true,
    imports: [ItemTableComponent, AddStudentComponent, AddTeacherComponent, ProfileLayoutComponent, ProfilePhotoComponent, ProfileInfoComponent, TitleCasePipe, DatePipe],
    selector: 'sman-teacher-profile',
    templateUrl: 'teacher-profile.component.html'
})

export class TeacherProfileComponent implements OnInit {
    teacher: Teacher | null = null;

    isShow: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private teacherService: TeacherService,
        private navigationService: NavigationService,
        private notiService: NotificationService

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

    showEditForm() {
        this.isShow = true;
    }

    hideEditForm() {
        this.isShow = false;
    }

    deleteTeacher() {
        this.teacherService.deleteTeacher(this.teacher!.id!)
            .subscribe((data) => {
                console.log(data);
                this.notiService.notify(`deleted teacher id: ${this.teacher!.id}`)
                this.goBack()
            })
    }

    goBack() {
        this.navigationService.goBack();
    }
}