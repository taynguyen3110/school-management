import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Classes, Teacher } from '../../shared/types';
import { DatePipe, Location, TitleCasePipe } from '@angular/common';
import { ItemTableComponent } from '../../shared/components/item-table/item-table.component';
import { NavigationService } from '../../shared/services/navigation.service';
import { NotificationService } from '../../shared/services/notification.service';
import { ProfileLayoutComponent } from "../../shared/components/profile-layout/profile-layout.component";
import { ProfilePhotoComponent } from "../../shared/components/profile-photo/profile-photo.component";
import { ProfileInfoComponent } from "../../shared/components/profile-info/profile-info.component";
import { ClassesService } from '../services/classes.service';
import { StudentService } from '../../students/service/student.service';
import { AddClassComponent } from '../classes-add/classes-add.component';

@Component({
    standalone: true,
    imports: [ItemTableComponent, AddClassComponent, ProfileLayoutComponent, ProfilePhotoComponent, ProfileInfoComponent, TitleCasePipe, DatePipe, RouterLink],
    selector: 'sman-class-detail',
    templateUrl: 'classes-detail.component.html'
})

export class ClassDetailComponent implements OnInit {
    classes: Classes | null = null;

    isShow: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private classesService: ClassesService,
        private studentService: StudentService,
        private navigationService: NavigationService,
        private notiService: NotificationService

    ) { }

    ngOnInit() {
        this.fetchClass();
    }

    fetchClass() {
        const classId = this.route.snapshot.params['id'];
        if (classId) {
            this.classesService.getClass(classId).subscribe((classes) => {
                this.classes = classes
            })
        }
    }

    showEditForm() {
        this.isShow = true;
    }

    hideEditForm() {
        this.isShow = false;
    }

    deleteClass() {
        this.classesService.deleteClass(this.classes!.id!)
            .subscribe((data) => {
                this.notiService.notify(`Deleted class id: ${this.classes!.id}`)
                this.goBack()
            })
    }

    goBack() {
        this.navigationService.goBack();
    }
}