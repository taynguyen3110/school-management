import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../shared/types';
import { StudentService } from '../service/student.service';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { ProfilePhotoComponent } from '../../shared/components/profile-photo/profile-photo.component';
import { ProfileInfoComponent } from '../../shared/components/profile-info/profile-info.component';
import { NavigationService } from '../../shared/services/navigation.service';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';
import { ProfileLayoutComponent } from '../../shared/components/profile-layout/profile-layout.component';
import { InformationWrapperComponent } from '../../shared/components/information-wrapper/information-wrapper.component';
import { ScreenService } from '@/app/shared/services/screen.service';
import { MatDialog } from '@angular/material/dialog';
import { StudentPersonalInfoComponent } from '../student-edit/personal-info/student-personal-info.component';
import { StudentEnrollmentInfoComponent } from '../student-edit/enrollment-info/student-enrollment-info.component';
import { StudentProfileInfoComponent } from '../student-edit/profile-info/student-profile-info.component';
import { ConfirmationService } from '@/app/shared/services/confirmation.service';
import { Title } from '@angular/platform-browser';

@Component({
    imports: [
        TitleCasePipe,
        DatePipe,
        RouterLink,
        ProfilePhotoComponent,
        ProfileInfoComponent,
        ProfileLayoutComponent,
        InformationWrapperComponent,
    ],
    selector: 'sman-student-profile',
    templateUrl: 'student-profile.component.html'
})
export class StudentProfileComponent implements OnInit, OnDestroy {
  student: Student | null = null;
  studentId: string = '';
  screenXs: boolean = false;

  readonly dialog = inject(MatDialog);

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private navigationService: NavigationService,
    private notiService: NotificationService,
    private screenService: ScreenService,
    private confirmationService: ConfirmationService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.fetchStudent();
    this.screenService.observeScreen('xs').subscribe((data) => {
      this.screenXs = data;
    });
  }

  fetchStudent() {
    this.studentId = this.route.snapshot.params['id'];
    this.studentService.getStudent(this.studentId).subscribe((student) => {
      this.student = student;
      this.titleService.setTitle(
        this.student?.firstName + ' ' + this.student?.lastName
      );
    });
  }

  showEditProfileInfo() {
    this.showDialog(StudentProfileInfoComponent);
  }

  showEditPersonalInfo() {
    this.showDialog(StudentPersonalInfoComponent);
  }

  showEditEnrollmentInfo() {
    this.showDialog(StudentEnrollmentInfoComponent);
  }

  showDialog(component: any) {
    this.dialog.open(component, {
      panelClass: ['overflow-auto', 'hide-scrollbar'],
      maxWidth: '700px',
      width: '80vw',
      disableClose: true,
      data: {
        ...this.student,
      } as Student,
    });
  }

  deleteStudent = () => {
    this.studentService.deleteStudent(this.student?.id!).subscribe(() => {
      this.notiService.notify(`Deleted student id: ${this.student?.id}`);
      this.goBack();
    });
  };

  onDelete() {
    this.confirmationService.openConfirmation(
      'Confirm Delete Student',
      `Do you really want to delete this student: ${this.student?.firstName} ${this.student?.lastName}?`,
      'Cancel',
      'Delete',
      () => {
        console.log('canceled');
      },
      this.deleteStudent
    );
  }

  goBack = () => {
    this.navigationService.goBack();
  };

  ngOnDestroy(): void {}
}
