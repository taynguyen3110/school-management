import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Classes, Teacher } from '../../shared/types';
import { DatePipe, Location, TitleCasePipe } from '@angular/common';
import { ItemTableComponent } from '../../shared/components/item-table/item-table.component';
import { NavigationService } from '../../shared/services/navigation.service';
import { NotificationService } from '../../shared/services/notification.service';
import { ProfileLayoutComponent } from '../../shared/components/profile-layout/profile-layout.component';
import { ProfilePhotoComponent } from '../../shared/components/profile-photo/profile-photo.component';
import { ProfileInfoComponent } from '../../shared/components/profile-info/profile-info.component';
import { ClassesService } from '../services/classes.service';
import { StudentService } from '../../students/service/student.service';
import { AddClassComponent } from '../classes-add/classes-add.component';
import { ParentProfileInfoComponent } from '@/app/parents/parent-edit/profile-info/parent-profile-info.component';
import { MatDialog } from '@angular/material/dialog';
import { ScreenService } from '@/app/shared/services/screen.service';
import { ClassEditComponent } from '../class-edit/class-edit.component';
import { ConfirmationService } from '@/app/shared/services/confirmation.service';
import { InformationWrapperComponent } from '@/app/shared/components/information-wrapper/information-wrapper.component';

@Component({
  standalone: true,
  imports: [
    ItemTableComponent,
    AddClassComponent,
    ProfileLayoutComponent,
    ProfilePhotoComponent,
    ProfileInfoComponent,
    TitleCasePipe,
    DatePipe,
    RouterLink,
    InformationWrapperComponent,
  ],
  selector: 'sman-class-detail',
  templateUrl: 'classes-detail.component.html',
})
export class ClassDetailComponent implements OnInit {
  classes: Classes | null = null;
  classId: string = '';
  screenXs: boolean = false;

  readonly dialog = inject(MatDialog);

  constructor(
    private route: ActivatedRoute,
    private classesService: ClassesService,
    private studentService: StudentService,
    private navigationService: NavigationService,
    private confirmationService: ConfirmationService,
    private screenService: ScreenService,
    private notiService: NotificationService
  ) {}

  ngOnInit() {
    this.fetchClass();
    this.screenService.observeScreen('xs').subscribe((data) => {
      this.screenXs = data;
    });
  }

  fetchClass() {
    this.classId = this.route.snapshot.params['id'];
    if (this.classId) {
      this.classesService.getClass(this.classId).subscribe((classes) => {
        this.classes = classes;
        console.log(classes);
        
      });
    }
  }

  showDialog(component: any) {
    this.dialog.open(component, {
      panelClass: ['overflow-auto', 'hide-scrollbar'],
      maxWidth: '700px',
      width: '80vw',
      disableClose: true,
      data: {
        ...this.classes,
      },
    });
  }

  showEditClassDetail() {
    this.showDialog(ClassEditComponent);
  }

  onDelete() {
    this.confirmationService.openConfirmation(
      'Confirm Delete Class',
      `Do you really want to delete this class: ${this.classes?.name}?`,
      'Cancel',
      'Delete',
      () => {
        console.log('canceled');
      },
      this.deleteClass
    );
  }

  deleteClass = () => {
    this.classesService.deleteClass(this.classes!.id!).subscribe((data) => {
      this.notiService.notify(`Deleted class id: ${this.classId}`);
      this.goBack();
    });
  };

  goBack() {
    this.navigationService.goBack();
  }
}
