import { Component, inject } from '@angular/core';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { AddStudentComponent } from '../student-add/student-add.component';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NavigationService } from '../../shared/services/navigation.service';
import { Subject, takeUntil } from 'rxjs';
import { StudentService } from '../service/student.service';
import { Student } from '../../shared/types';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemTableComponent } from '../../shared/components/item-table/item-table.component';
import { PageLayoutComponent } from '../../shared/components/page-layout/page-layout.component';
import { FilterComponent } from '../../shared/components/filter/filter.component';
import { Store } from '@ngrx/store';
import { loadStudentsSuccess } from '@/app/state/student/student.actions';
import { selectAllStudents } from '@/app/state/student/student.selector';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'sman-students',
  imports: [
    PaginationComponent,
    ReactiveFormsModule,
    ItemTableComponent,
    PageLayoutComponent,
    FilterComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './students-page.component.html',
  styleUrl: './students-page.component.scss',
})
export class StudentsComponent {
  studentsCount: number = 0;
  itemPerPage: number = 0;
  totalPage: number = 0;
  students: Student[] = [];
  currentPage: number = 1;
  filterParams: Params = {};
  isLoading: boolean = false;
  isFiltering: boolean = false;

  unsubscribe$ = new Subject<void>();

  readonly dialog = inject(MatDialog);
  public studentState$ = this.store.select(selectAllStudents);

  constructor(
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private studentService: StudentService,
    private store: Store
  ) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params) => {
        this.filterParams = params;
        if (!params['page']) {
          this.navigationService.toRoute(
            'students',
            'add',
            { page: this.currentPage },
            true
          );
        } else {
          this.checkFiltering();
          this.currentPage = +params['page'];
          if (this.currentPage === 1) {
            this.studentState$
              .pipe(takeUntil(this.unsubscribe$))
              .subscribe((state) => {
                if (state.status === 'loaded' && !this.isFiltering) {
                  this.setPagination(state);
                  this.isLoading = false;
                } else {
                  this.isLoading = true;
                  this.fetchStudents(params).subscribe({
                    next: (data: any) => {
                      console.log(data);

                      this.setPagination(data);
                      if (this.currentPage === 1 && !this.isFiltering) {
                        this.saveStudentList(
                          data.students,
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
            this.fetchStudents(params).subscribe({
              next: (data: any) => {
                console.log(data);

                this.setPagination(data);
                if (this.currentPage === 1) {
                  this.saveStudentList(
                    data.students,
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

  saveStudentList(
    students: Student[],
    total: number,
    rowsPerPage: number,
    totalPages: number
  ) {
    this.store.dispatch(
      loadStudentsSuccess({ students, total, rowsPerPage, totalPages })
    );
  }

  openDialog(): void {
    this.dialog.open(AddStudentComponent, {
      panelClass: ['overflow-auto', 'hide-scrollbar'],
      maxWidth: '700px',
      width: '80vw',
      disableClose: true,
    });
  }

  fetchStudents(filter?: Params) {
    return this.studentService.getStudents(filter);
  }

  handlePageChange(page: number) {
    this.navigationService.toRoute('students', 'add', { page }, true);
  }

  filterStudents(filterParams: any) {
    let newParams: Params = {};
    if (filterParams.isNotSort) {
      this.navigationService.toRoute('students', 'delete', ['sortBy', 'order']);
    } else {
      newParams = { ...filterParams, page: 1 };
      this.navigationService.toRoute('students', 'add', newParams, true);
    }
  }

  resetFilter() {
    this.navigationService.toRoute('students', 'delete', ['name', 'classIds']);
  }

  setPagination(data: any) {
    this.students = data.students;
    this.studentsCount = data.total;
    this.itemPerPage = data.rowsPerPage;
    this.totalPage = data.totalPages;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
