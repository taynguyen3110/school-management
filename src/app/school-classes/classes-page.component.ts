import { Component, inject } from '@angular/core';
import { Classes } from '../shared/types';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { NavigationService } from '../shared/services/navigation.service';
import { AddClassComponent } from './classes-add/classes-add.component';
import { ItemTableComponent } from '../shared/components/item-table/item-table.component';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';
import { ClassesService } from './services/classes.service';
import { PageLayoutComponent } from '../shared/components/page-layout/page-layout.component';
import { FilterComponent } from '../shared/components/filter/filter.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectAllClasses } from '../state/class/class.selector';
import { loadClassesSuccess } from '../state/class/class.actions';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'sman-classes',
  imports: [
    ItemTableComponent,
    PaginationComponent,
    PageLayoutComponent,
    FilterComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './classes-page.component.html',
})
export class ClassesComponent {
  classesCount: number = 0;
  itemPerPage: number = 0;
  totalPage: number = 0;
  classes: Classes[] = [];
  currentPage: number = 1;
  filterParams: Params = {};
  isLoading: boolean = false;
  isFiltering: boolean = false;

  unsubscribe$ = new Subject<void>();

  readonly dialog = inject(MatDialog);
  public classState$ = this.store.select(selectAllClasses);

  constructor(
    private classesService: ClassesService,
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
            'classes',
            'add',
            { page: this.currentPage },
            true
          );
        } else {
          this.checkFiltering();
          this.currentPage = +params['page'];
          if (this.currentPage === 1) {
            this.classState$
              .pipe(takeUntil(this.unsubscribe$))
              .subscribe((state) => {
                if (state.status === 'loaded' && !this.isFiltering) {
                  this.setPagination(state);
                  this.isLoading = false;
                } else {
                  this.isLoading = true;
                  this.fetchClass(params).subscribe({
                    next: (data: any) => {
                      this.setPagination(data);
                      if (this.currentPage === 1 && !this.isFiltering) {
                        this.saveClassList(
                          data.classes,
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
            this.fetchClass(params).subscribe({
              next: (data: any) => {
                this.setPagination(data);
                if (this.currentPage === 1) {
                  this.saveClassList(
                    data.classes,
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
    if (this.filterParams['name']) {
      this.isFiltering = true;
    } else {
      this.isFiltering = false;
    }
  }

  saveClassList(
    classes: Classes[],
    total: number,
    rowsPerPage: number,
    totalPages: number
  ) {
    this.store.dispatch(
      loadClassesSuccess({ classes, total, rowsPerPage, totalPages })
    );
  }

  openDialog(): void {
    this.dialog.open(AddClassComponent, {
      panelClass: ['overflow-auto', 'hide-scrollbar'],
      maxWidth: '700px',
      width: '80vw',
      disableClose: true,
    });
  }

  fetchClass(filter?: Params) {
    return this.classesService.getClasses(filter);
  }

  handlePageChange(page: number) {
    this.navigationService.toRoute('classes', 'add', { page }, true);
  }

  filterClasses(filterParams: any) {
    let newParams: Params = {};
    if (filterParams.isNotSort) {
      this.navigationService.toRoute('classes', 'delete', ['sortBy', 'order']);
    } else {
      newParams = { ...filterParams, page: 1 };
      this.navigationService.toRoute('classes', 'add', newParams, true);
    }
  }

  resetFilter() {
    this.navigationService.toRoute('classes', 'delete', ['name']);
  }

  setPagination(data: any) {
    this.classes = data.classes;
    this.classesCount = data.total;
    this.itemPerPage = data.rowsPerPage;
    this.totalPage = data.totalPages;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
