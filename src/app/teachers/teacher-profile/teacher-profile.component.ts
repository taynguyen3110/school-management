import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Teacher } from '../../shared/types';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { TeacherService } from '../services/teacher.service';
import { NavigationService } from '../../shared/services/navigation.service';
import { NotificationService } from '../../shared/services/notification.service';
import { ProfileLayoutComponent } from '../../shared/components/profile-layout/profile-layout.component';
import { ProfilePhotoComponent } from '../../shared/components/profile-photo/profile-photo.component';
import { ProfileInfoComponent } from '../../shared/components/profile-info/profile-info.component';
import { InformationWrapperComponent } from '@/app/shared/components/information-wrapper/information-wrapper.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationService } from '@/app/shared/services/confirmation.service';
import { ScreenService } from '@/app/shared/services/screen.service';
import { Title } from '@angular/platform-browser';
import { TeacherProfileInfoComponent } from '../teacher-edit/profile-info/teacher-profile-info.component';
import { TeacherPersonalInfoComponent } from '../teacher-edit/personal-info/teacher-personal-info.component';
import { TeacherEnrollmentInfoComponent } from '../teacher-edit/enrollment-info/teacher-enrollment-info.component';

@Component({
  standalone: true,
  imports: [
    ProfileLayoutComponent,
    ProfilePhotoComponent,
    ProfileInfoComponent,
    TitleCasePipe,
    DatePipe,
    InformationWrapperComponent,
  ],
  selector: 'sman-teacher-profile',
  templateUrl: 'teacher-profile.component.html',
})
export class TeacherProfileComponent implements OnInit {
  teacher: Teacher | null = null;
  teacherId: string = '';
  screenXs: boolean = false;
  readonly dialog = inject(MatDialog);

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private navigationService: NavigationService,
    private notiService: NotificationService,
    private screenService: ScreenService,
    private confirmationService: ConfirmationService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.fetchTeacher();
    this.screenService.observeScreen('xs').subscribe((data) => {
      this.screenXs = data;
    });
  }

  fetchTeacher() {
    this.teacherId = this.route.snapshot.params['id'];
    if (this.teacherId) {
      this.teacherService.getTeacher(this.teacherId).subscribe((teacher) => {
        this.teacher = teacher;
        this.titleService.setTitle(
          this.teacher?.firstName + ' ' + this.teacher?.lastName
        );
      });
    }
  }

  showEditProfileInfo() {
    this.showDialog(TeacherProfileInfoComponent);
  }

  showEditPersonalInfo() {
    this.showDialog(TeacherPersonalInfoComponent);
  }

  showEditEnrollmentInfo() {
    this.showDialog(TeacherEnrollmentInfoComponent);
  }

  showDialog(component: any) {
    this.dialog.open(component, {
      panelClass: ['overflow-auto', 'hide-scrollbar'],
      maxWidth: '700px',
      width: '80vw',
      disableClose: true,
      data: {
        ...this.teacher,
      } as Teacher,
    });
  }

  deleteTeacher = () => {
    this.teacherService.deleteTeacher(this.teacher!.id!).subscribe(() => {
      this.notiService.notify(`Deleted teacher id: ${this.teacher!.id}`);
      this.goBack();
    });
  };

  onDelete() {
    this.confirmationService.openConfirmation(
      'Confirm Delete Teacher',
      `Do you really want to delete this student: ${this.teacher?.firstName} ${this.teacher?.lastName}?`,
      'Cancel',
      'Delete',
      () => {
        console.log('canceled');
      },
      this.deleteTeacher
    );
  }

  goBack() {
    this.navigationService.goBack();
  }
}
