import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Parent, Student } from '../../shared/types';
import { Location } from '@angular/common';
import { AddParentComponent } from '../parent-add/parent-add.component';
import { ParentsService } from '../services/parents.service';
import { StudentService } from '../../students/service/student.service';
import { NotificationService } from '../../shared/services/notification.service';
import { ProfileLayoutComponent } from '../../shared/components/profile-layout/profile-layout.component';
import { ProfilePhotoComponent } from '../../shared/components/profile-photo/profile-photo.component';
import { ProfileInfoComponent } from '../../shared/components/profile-info/profile-info.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationService } from '@/app/shared/services/confirmation.service';
import { ScreenService } from '@/app/shared/services/screen.service';
import { Title } from '@angular/platform-browser';
import { NavigationService } from '@/app/shared/services/navigation.service';
import { InformationWrapperComponent } from '@/app/shared/components/information-wrapper/information-wrapper.component';
import { ParentEnrollmentInfoComponent } from '../parent-edit/enrollment-info/parent-enrollment-info.component';

@Component({
  standalone: true,
  imports: [
    AddParentComponent,
    ProfileLayoutComponent,
    ProfilePhotoComponent,
    ProfileInfoComponent,
    RouterLink,
    InformationWrapperComponent,
  ],
  selector: 'sman-parent-profile',
  templateUrl: 'parent-profile.component.html',
})
export class ParentProfileComponent implements OnInit {
  parent: Parent | null = null;
  parentId: string = '';
  students: Student[] = [];
  screenXs: boolean = false;

  readonly dialog = inject(MatDialog);

  constructor(
    private route: ActivatedRoute,
    private parentService: ParentsService,
    private studentService: StudentService,
    private notiService: NotificationService,
    private screenService: ScreenService,
    private confirmationService: ConfirmationService,
    private titleService: Title,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.fetchParent();
    this.fetchStudentsByParent();
    this.screenService.observeScreen('xs').subscribe((data) => {
      this.screenXs = data;
    });
  }

  fetchParent() {
    this.parentId = this.route.snapshot.params['id'];
    if (this.parentId) {
      this.parentService.getParent(this.parentId).subscribe((parent) => {
        this.parent = parent;
        this.titleService.setTitle(
          this.parent?.firstName + ' ' + this.parent?.lastName
        );
      });
    }
  }

  fetchStudentsByParent() {
    this.studentService
      .lookUpStudentsByParent(this.parentId)
      .subscribe((students) => {
        this.students = students;
      });
  }

  showEditProfileInfo() {
    // this.dialog.open(StudentProfileInfoComponent, {
    //   panelClass: ['overflow-auto', 'hide-scrollbar'],
    //   maxWidth: '700px',
    //   width: '80vw',
    //   data: {
    //     ...this.student,
    //   } as Student,
    // });
  }

  showEditPersonalInfo() {
    // this.dialog.open(StudentPersonalInfoComponent, {
    //   panelClass: ['overflow-auto', 'hide-scrollbar'],
    //   maxWidth: '700px',
    //   width: '80vw',
    //   data: {
    //     ...this.student,
    //   } as Student,
    // });
  }

  showEditEnrollmentInfo() {
    this.dialog.open(ParentEnrollmentInfoComponent, {
      panelClass: ['overflow-auto', 'hide-scrollbar'],
      maxWidth: '700px',
      width: '80vw',
      data: {
        students: this.students,
        ...this.parent,
      },
    });
  }

  deleteParent() {
    this.parentService.deleteParent(this.parentId).subscribe((data) => {
      this.notiService.notify(`deleted student id: ${this.parentId}`);
      this.goBack();
    });
  }

  onDelete() {
    this.confirmationService.openConfirmation(
      'Confirm Delete Parent',
      `Do you really want to delete this parent: ${this.parent?.firstName} ${this.parent?.lastName}?`,
      'Cancel',
      'Delete',
      () => {
        console.log('canceled');
      },
      this.deleteParent
    );
  }

  goBack() {
    this.navigationService.goBack();
  }
}
