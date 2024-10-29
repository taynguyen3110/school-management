import { Component } from '@angular/core';
import { Teacher } from '../shared/types';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { QueryService } from '../shared/services/filter.service';
import { NavigationService } from '../shared/services/navigation.service';
import { AddTeacherComponent } from './subject-add/subject-add.component';
import { ItemTableComponent } from '../shared/components/item-table/item-table.component';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';
import { TeacherService } from './services/subject.service';
import { TeacherFilterComponent } from './subject-filter/subject-filter.component';

@Component({
  selector: 'sman-teachers',
  standalone: true,
  imports: [ItemTableComponent, PaginationComponent, AddTeacherComponent, TeacherFilterComponent],
  templateUrl: './teachers-page.component.html',
})
export class TeachersComponent {
  teachersCount: number = 0;
  itemPerPage: number = 0;
  totalPage: number = 0;
  teachers: Teacher[] = [];
  displayAddTeacher: boolean = false;
  currentPage: number = 1;
  filterParams: Params = {};

  unsubscribe$ = new Subject<void>()

  constructor(
    private teacherService: TeacherService,
    private navigationService: NavigationService,
    private queryService: QueryService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.displayAddTeacher = this.route.snapshot.queryParamMap.get('addTeacher') === "true";
    this.route.queryParams
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((params) => {
        this.displayAddTeacher = params['addTeacher'] === "true";
        this.filterParams = params;
        if (!params['page']) {
          const newParam = this.queryService.setParam(params, { page: this.currentPage });
          this.applyQueryChanges(newParam);
        } else {
          this.currentPage = +params['page'];
          this.fetchTeachers(params).subscribe((data: any) => {
            this.setPagination(data);
          })
        }
      })
  }

  fetchTeachers(filter?: Params) {
    return this.teacherService.getTeachers(filter);
  }

  applyQueryChanges(param: Params) {
    this.navigationService.toRoute('teachers', param, true);
  }

  handlePageChange(page: number) {
    const newParams = this.queryService.addToCurrentParam({ page });
    this.applyQueryChanges(newParams);
  }

  setPagination(data: any) {
    this.teachers = data.teachers;
    this.teachersCount = data.total;
    this.itemPerPage = data.rowsPerPage;
    this.totalPage = data.totalPages;
  }

  showAddTeacherForm() {
    this.displayAddTeacher = true;
  }

  hideAddTeacherForm = () => {
    const newParams = this.queryService.deleteFromCurrentParam('addTeacher');
    this.navigationService.toRoute("teachers", newParams, true);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
