import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { NavigationService } from '../shared/services/navigation.service';
import { ButtonComponent } from '../shared/components/button/button.component';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { StudentService } from '../students/service/student.service';
import { ParentsService } from '../parents/services/parents.service';
import { TeacherService } from '../teachers/services/teacher.service';
import { ItemTableComponent } from '../shared/components/item-table/item-table.component';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';

@Component({
  standalone: true,
  imports: [
    ButtonComponent,
    MatTabsModule,
    ItemTableComponent,
    PaginationComponent,
  ],
  selector: 'sman-global-search',
  templateUrl: 'global-search.component.html',
})
export class GlobalSearchComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  searchQuery: string = '';

  studentData: any = {};
  parentData: any = {};
  teacherData: any = {};

  constructor(
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private parentService: ParentsService,
    private teacherService: TeacherService
  ) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params) => {
        if (params['name']) {
          this.searchQuery = params['name'];
          this.handlePageChange(1);
        }
      });
  }

  fetchStudents(params: Params) {
    this.studentService.getStudents(params).subscribe((data) => {
      this.studentData = { ...data };
    });
  }

  fetchParents(params: Params) {
    this.parentService.getParents(params).subscribe((data) => {
      this.parentData = { ...data };
    });
  }

  fetchTeachers(params: Params) {
    this.teacherService.getTeachers(params).subscribe((data) => {
      this.teacherData = { ...data };
    });
  }

  handlePageChange(page: number) {
    const params = { name: this.searchQuery, page };
    this.fetchStudents(params);
    this.fetchParents(params);
    this.fetchTeachers(params);
  }

  onSwitchTab() {
    this.handlePageChange(1);
  }

  goBack() {
    this.navigationService.goBack();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
