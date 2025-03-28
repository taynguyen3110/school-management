import { Component, inject } from '@angular/core';
import { SchoolSubject } from '../shared/types';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { NavigationService } from '../shared/services/navigation.service';
import { AddSubjectComponent } from './subject-add/subject-add.component';
import { ItemTableComponent } from '../shared/components/item-table/item-table.component';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';
import { SubjectService } from './services/subject.service';
import { PageLayoutComponent } from '../shared/components/page-layout/page-layout.component';
import { FilterComponent } from '../shared/components/filter/filter.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectAllSubjects } from '../state/subject/subject.selector';
import { loadSubjectsSuccess } from '../state/subject/subject.actions';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'sman-subjects',
    imports: [
        ItemTableComponent,
        PaginationComponent,
        PageLayoutComponent,
        FilterComponent,
        MatProgressSpinnerModule,
    ],
    templateUrl: './subject-page.component.html'
})
export class SubjectsComponent {
  subjectsCount: number = 0;
  itemPerPage: number = 0;
  totalPage: number = 0;
  subjects: SchoolSubject[] = [];
  currentPage: number = 1;
  filterParams: Params = {};
  isLoading: boolean = false;
  isFiltering: boolean = false;

  unsubscribe$ = new Subject<void>();

  readonly dialog = inject(MatDialog);
  public subjectState$ = this.store.select(selectAllSubjects);

  constructor(
    private subjectService: SubjectService,
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
            'subjects',
            'add',
            { page: this.currentPage },
            true,
          );
        } else {
          this.checkFiltering();
          this.currentPage = +params['page'];
          if (this.currentPage === 1) {
            this.subjectState$
              .pipe(takeUntil(this.unsubscribe$))
              .subscribe((state) => {
                if (state.status === 'loaded' && !this.isFiltering) {
                  this.setPagination(state);
                  this.isLoading = false;
                } else {
                  this.isLoading = true;
                  this.fetchSubjects(params).subscribe({
                    next: (data: any) => {
                      this.setPagination(data);
                      if (this.currentPage === 1 && !this.isFiltering) {
                        this.saveSubjectList(
                          data.subjects,
                          data.total,
                          data.rowsPerPage,
                          data.totalPages
                        );
                      }
                      this.isLoading = false;
                    },
                    error: () => {
                      this.isLoading = false;
                    }
                  });
                }
              });
          } else {
            this.isLoading = true;
            this.fetchSubjects(params).subscribe({
              next: (data: any) => {
                this.setPagination(data);
                if (this.currentPage === 1) {
                  this.saveSubjectList(
                    data.subjects,
                    data.total,
                    data.rowsPerPage,
                    data.totalPages
                  );
                }
                this.isLoading = false;
              },
              error: () => {
                this.isLoading = false;
              }
            });
          }
        }
      });
  }

  checkFiltering() {
    if (this.filterParams['name'] || this.filterParams['classIds']) {
      this.isFiltering = true;
    } else {
      this.isFiltering = false;
    }
  }

  saveSubjectList(
    subjects: SchoolSubject[],
    total: number,
    rowsPerPage: number,
    totalPages: number
  ) {
    this.store.dispatch(
      loadSubjectsSuccess({ subjects, total, rowsPerPage, totalPages })
    );
  }

  openDialog(): void {
    this.dialog.open(AddSubjectComponent, {
      panelClass: ['overflow-auto', 'hide-scrollbar'],
      maxWidth: '700px',
      width: '80vw',
      disableClose: true,
    });
  }

  fetchSubjects(filter?: Params) {
    return this.subjectService.getSubjects(filter);
  }

  handlePageChange(page: number) {
    this.navigationService.toRoute('subjects', 'add', { page }, true);
  }

  setPagination(data: any) {
    this.subjects = data.subjects;
    this.subjectsCount = data.total;
    this.itemPerPage = data.rowsPerPage;
    this.totalPage = data.totalPages;
  }

  filterSubjects(filterParams: any) {
    let newParams: Params = {};
    if (filterParams.isNotSort) {
      this.navigationService.toRoute('subjects', 'delete', ['sortBy', 'order']);
    } else {
      newParams = { ...filterParams, page: 1 };
      this.navigationService.toRoute('subjects', 'add', newParams, true);
    }
  }

  resetFilter() {
    this.navigationService.toRoute('subjects', 'delete', ['name']);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
