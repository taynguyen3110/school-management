import { Component, OnInit } from '@angular/core';
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
  ],
  selector: 'sman-subject-detail',
  templateUrl: 'subject-detail.component.html',
})
export class SubjectDetailComponent implements OnInit {
  subject: SchoolSubject | null = null;

  isShow: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private navigationService: NavigationService,
    private notiService: NotificationService
  ) {}

  ngOnInit() {
    this.fetchSubject();
  }

  fetchSubject() {
    const subjectId = this.route.snapshot.params['id'];
    if (subjectId) {
      this.subjectService.getSubject(subjectId).subscribe((subject) => {
        this.subject = subject;
      });
    }
  }

  showEditForm() {
    this.isShow = true;
  }

  hideEditForm() {
    this.isShow = false;
  }

  deleteSubject() {
    const confirm = window.confirm(
      'Are you sure you want to delete this subject?'
    );
    if (confirm) {
      this.subjectService.deleteSubject(this.subject!.id!).subscribe((data) => {
        console.log(data);
        this.notiService.notify(`deleted subject id: ${this.subject!.id}`);
        this.goBack();
      });
    }
  }

  goBack() {
    this.navigationService.goBack();
  }
}
