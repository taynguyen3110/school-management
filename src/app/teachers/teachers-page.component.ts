import { Component, inject } from '@angular/core';
import { Teacher } from '../shared/types';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { NavigationService } from '../shared/services/navigation.service';
import { AddTeacherComponent } from './teacher-add/teacher-add.component';
import { ItemTableComponent } from '../shared/components/item-table/item-table.component';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';
import { TeacherService } from './services/teacher.service';
import { PageLayoutComponent } from '../shared/components/page-layout/page-layout.component';
import { FilterComponent } from '../shared/components/filter/filter.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'sman-teachers',
    imports: [
        ItemTableComponent,
        PaginationComponent,
        AddTeacherComponent,
        PageLayoutComponent,
        FilterComponent,
    ],
    templateUrl: './teachers-page.component.html'
})
export class TeachersComponent {
  teachersCount: number = 0;
  itemPerPage: number = 0;
  totalPage: number = 0;
  teachers: Teacher[] = [];
  currentPage: number = 1;
  filterParams: Params = {};

  addFormIsDirty: boolean = false;

  unsubscribe$ = new Subject<void>();

  readonly dialog = inject(MatDialog);


  constructor(
    private teacherService: TeacherService,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
   
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params) => {
        this.filterParams = params;
        if (!params['page']) {
          this.navigationService.toRoute(
            'teachers',
            'add',
            { page: this.currentPage },
            true,
          );
        } else {
          this.currentPage = +params['page'];
          this.fetchTeachers(params).subscribe((data: any) => {
            this.setPagination(data);
          });
        }
      });
  }

  openDialog(): void {
    this.dialog.open(AddTeacherComponent, {
      panelClass: ['overflow-auto', 'hide-scrollbar'],
      maxWidth: '700px',
      width: '80vw',
      disableClose: true,
    });
  }

  fetchTeachers(filter?: Params) {
    return this.teacherService.getTeachers(filter);
  }

  handlePageChange(page: number) {
    this.navigationService.toRoute('teachers', 'add', { page }, true);
  }

  setPagination(data: any) {
    this.teachers = data.teachers;
    this.teachersCount = data.total;
    this.itemPerPage = data.rowsPerPage;
    this.totalPage = data.totalPages;
  }

  filterTeachers(filterParams: any) {
    let newParams: Params = {};
    if (filterParams.isNotSort) {
      this.navigationService.toRoute('teachers', 'delete', ['sortBy', 'order']);
    } else {
      newParams = { ...filterParams, page: 1 };
      this.navigationService.toRoute('teachers', 'add', newParams, true);
    }
  }

  resetFilter() {
    this.navigationService.toRoute('teachers', 'delete', ['name', 'classIds']);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
