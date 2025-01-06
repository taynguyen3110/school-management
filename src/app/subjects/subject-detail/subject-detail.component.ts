import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SchoolSubject } from '../../shared/types';
import { DatePipe, Location, TitleCasePipe } from '@angular/common';
import { SubjectService } from '../services/subject.service';
import { ItemTableComponent } from '../../shared/components/item-table/item-table.component';
import { StudentService } from '../../students/service/student.service';
import { NavigationService } from '../../shared/services/navigation.service';
import { NotificationService } from '../../shared/services/notification.service';
import { AddStudentComponent } from '../../students/student-add/student-add.component';
import { AddSubjectComponent } from '../subject-add/subject-add.component';
import { ProfileLayoutComponent } from '../../shared/components/profile-layout/profile-layout.component';
import { ProfilePhotoComponent } from '../../shared/components/profile-photo/profile-photo.component';
import { ProfileInfoComponent } from '../../shared/components/profile-info/profile-info.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationService } from '@/app/shared/services/confirmation.service';
import { ScreenService } from '@/app/shared/services/screen.service';
import { Title } from '@angular/platform-browser';
import { InformationWrapperComponent } from '@/app/shared/components/information-wrapper/information-wrapper.component';
import { SubjectEditComponent } from '../subject-edit/subject-edit.component';

@Component({
  standalone: true,
  imports: [
    ItemTableComponent,
    AddStudentComponent,
    AddSubjectComponent,
    ProfileLayoutComponent,
    ProfilePhotoComponent,
    ProfileInfoComponent,
    TitleCasePipe,
    DatePipe,
    RouterLink,
    InformationWrapperComponent,
  ],
  selector: 'sman-subject-detail',
  templateUrl: 'subject-detail.component.html',
})
export class SubjectDetailComponent implements OnInit {
  subject: SchoolSubject | null = null;
  subjectId: string = '';
  screenXs: boolean = false;

  readonly dialog = inject(MatDialog);

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private navigationService: NavigationService,
    private notiService: NotificationService,
    private screenService: ScreenService,
    private confirmationService: ConfirmationService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.fetchSubject();
    this.screenService.observeScreen('xs').subscribe((data) => {
      this.screenXs = data;
    });
  }

  fetchSubject() {
    this.subjectId = this.route.snapshot.params['id'];
    if (this.subjectId) {
      this.subjectService.getSubject(this.subjectId).subscribe((subject) => {
        this.subject = subject;
        this.titleService.setTitle(this.subject?.name);
      });
    }
  }

  showSubjectInfo() {
    this.showDialog(SubjectEditComponent);
  }

  showDialog(component: any) {
    this.dialog.open(component, {
      panelClass: ['overflow-auto', 'hide-scrollbar'],
      maxWidth: '700px',
      width: '80vw',
      disableClose: true,
      data: {
        ...this.subject,
      } as SchoolSubject,
    });
  }

  deleteSubject = () => {
    this.subjectService.deleteSubject(this.subject!.id!).subscribe((data) => {
      console.log(data);
      this.notiService.notify(`Deleted subject id: ${this.subject!.id}`);
      this.goBack();
    });
  };

  onDelete() {
    this.confirmationService.openConfirmation(
      'Confirm Delete Student',
      `Do you really want to delete this student: ${this.subject?.name}?`,
      'Cancel',
      'Delete',
      () => {
        console.log('canceled');
      },
      this.deleteSubject
    );
  }

  goBack() {
    this.navigationService.goBack();
  }
}
