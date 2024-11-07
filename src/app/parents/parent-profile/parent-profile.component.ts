import { Component, OnInit } from '@angular/core';
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

@Component({
  standalone: true,
  imports: [
    AddParentComponent,
    ProfileLayoutComponent,
    ProfilePhotoComponent,
    ProfileInfoComponent,
    RouterLink,
  ],
  selector: 'sman-parent-profile',
  templateUrl: 'parent-profile.component.html',
})
export class ParentProfileComponent implements OnInit {
  parentId: string = '';
  parent: Parent | null = null;
  students: Student[] = [];

  isShow: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private parentService: ParentsService,
    private studentService: StudentService,
    private location: Location,
    private notiService: NotificationService
  ) {}

  ngOnInit() {
    this.fetchParent();
    this.fetchStudentsByParent();
  }

  fetchParent() {
    this.parentId = this.route.snapshot.params['id'];
    if (this.parentId) {
      this.parentService.getParent(this.parentId).subscribe((parent) => {
        this.parent = parent;
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

  showEditForm() {
    this.isShow = true;
  }

  hideEditForm() {
    this.isShow = false;
  }

  deleteParent() {
    const confirmed = window.confirm(
      'Are you sure you want to delete this student?'
    );
    if (confirmed) {
      this.parentService.deleteParent(this.parentId).subscribe((data) => {
        console.log(data);
        this.notiService.notify(`deleted student id: ${this.parentId}`);
        this.goBack();
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
