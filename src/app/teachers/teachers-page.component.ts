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
import { Store } from '@ngrx/store';
import { selectAllTeachers } from '../state/teacher/teacher.selector';
import { loadTeachersSuccess } from '../state/teacher/teacher.actions';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'sman-teachers',
  imports: [
    ItemTableComponent,
    PaginationComponent,
    PageLayoutComponent,
    FilterComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './teachers-page.component.html',
})
export class TeachersComponent {
  teachersCount: number = 0;
  itemPerPage: number = 0;
  totalPage: number = 0;
  teachers: Teacher[] = [];
  currentPage: number = 1;
  filterParams: Params = {};
  isLoading: boolean = false;
  isFiltering: boolean = false;

  addFormIsDirty: boolean = false;

  unsubscribe$ = new Subject<void>();

  readonly dialog = inject(MatDialog);

  public teacherState$ = this.store.select(selectAllTeachers);

  constructor(
    private teacherService: TeacherService,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private store: Store
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
            true
          );
        } else {
          this.checkFiltering();
          this.currentPage = +params['page'];
          if (this.currentPage === 1) {
            this.teacherState$
              .pipe(takeUntil(this.unsubscribe$))
              .subscribe((state) => {
                if (state.status === 'loaded' && !this.isFiltering) {
                  this.setPagination(state);
                  this.isLoading = false;
                } else {
                  this.isLoading = true;
                  this.fetchTeachers(params).subscribe({
                    next: (data: any) => {
                      this.setPagination(data);
                      if (this.currentPage === 1 && !this.isFiltering) {
                        this.saveTeacherList(
                          data.teachers,
                          data.total,
                          data.rowsPerPage,
                          data.totalPages
                        );
                      }
                      this.isLoading = false;
                    },
                    error: () => {
                      this.isLoading = false;
                    },
                  });
                }
              });
          } else {
            this.isLoading = true;
            this.fetchTeachers(params).subscribe({
              next: (data: any) => {
                this.setPagination(data);
                if (this.currentPage === 1) {
                  this.saveTeacherList(
                    data.teachers,
                    data.total,
                    data.rowsPerPage,
                    data.totalPages
                  );
                }
                this.isLoading = false;
              },
              error: () => {
                this.isLoading = false;
              },
            });
          }
        }
      });
  }

  checkFiltering() {
    if (
      this.filterParams['name'] ||
      this.filterParams['classIds'] ||
      this.filterParams['sortBy']
    ) {
      this.isFiltering = true;
    } else {
      this.isFiltering = false;
    }
  }

  saveTeacherList(
    teachers: Teacher[],
    total: number,
    rowsPerPage: number,
    totalPages: number
  ) {
    this.store.dispatch(
      loadTeachersSuccess({ teachers, total, rowsPerPage, totalPages })
    );
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
    this.navigationService.toRoute('teachers', 'delete', ['name']);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
