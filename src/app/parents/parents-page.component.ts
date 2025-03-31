import { Component, inject } from '@angular/core';
import { ItemTableComponent } from '../shared/components/item-table/item-table.component';
import { Parent } from '../shared/types';
import { ParentsService } from './services/parents.service';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';
import { ActivatedRoute, Params } from '@angular/router';
import { NavigationService } from '../shared/services/navigation.service';
import { Subject, takeUntil } from 'rxjs';
import { AddParentComponent } from './parent-add/parent-add.component';
import { PageLayoutComponent } from '../shared/components/page-layout/page-layout.component';
import { FilterComponent } from '../shared/components/filter/filter.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { loadParentsSuccess } from '../state/parent/parent.actions';
import { selectAllParents } from '../state/parent/parent.selector';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'sman-parents',
  imports: [
    ItemTableComponent,
    PaginationComponent,
    PageLayoutComponent,
    FilterComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './parents-page.component.html',
  styleUrl: './parents-page.component.scss',
})
export class ParentsComponent {
  parentsCount: number = 0;
  itemPerPage: number = 0;
  totalPage: number = 0;
  parents: Parent[] = [];
  currentPage: number = 1;
  filterParams: Params = {};
  isLoading: boolean = false;
  isFiltering: boolean = false;

  unsubscribe$ = new Subject<void>();

  readonly dialog = inject(MatDialog);
  public parentState$ = this.store.select(selectAllParents);

  constructor(
    private parentsService: ParentsService,
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
            'parents',
            'add',
            { page: this.currentPage },
            true
          );
        } else {
          this.checkFiltering();
          this.currentPage = +params['page'];
          if (this.currentPage === 1) {
            this.parentState$
              .pipe(takeUntil(this.unsubscribe$))
              .subscribe((state) => {
                if (state.status === 'loaded' && !this.isFiltering) {
                  this.setPagination(state);
                  this.isLoading = false;
                } else {
                  this.isLoading = true;
                  this.fetchParents(params).subscribe({
                    next: (data: any) => {
                      this.setPagination(data);
                      if (this.currentPage === 1 && !this.isFiltering) {
                        this.saveParentList(
                          data.parents,
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
            this.fetchParents(params).subscribe({
              next: (data: any) => {
                this.setPagination(data);
                if (this.currentPage === 1) {
                  this.saveParentList(
                    data.parents,
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

  saveParentList(
    parents: Parent[],
    total: number,
    rowsPerPage: number,
    totalPages: number
  ) {
    this.store.dispatch(
      loadParentsSuccess({ parents, total, rowsPerPage, totalPages })
    );
  }

  openDialog(): void {
    this.dialog.open(AddParentComponent, {
      panelClass: ['overflow-auto', 'hide-scrollbar'],
      maxWidth: '700px',
      width: '80vw',
      disableClose: true,
    });
  }

  fetchParents(filter?: Params) {
    return this.parentsService.getParents(filter);
  }

  handlePageChange(page: number) {
    this.navigationService.toRoute('parents', 'add', { page }, true);
  }

  filterParents(filterParams: any) {
    let newParams: Params = {};
    if (filterParams.isNotSort) {
      this.navigationService.toRoute('parents', 'delete', ['sortBy', 'order']);
    } else {
      newParams = { ...filterParams, page: 1 };
      this.navigationService.toRoute('parents', 'add', newParams, true);
    }
  }

  resetFilter() {
    this.navigationService.toRoute('parents', 'delete', ['name']);
  }

  setPagination(data: any) {
    this.parents = data.parents;
    this.parentsCount = data.total;
    this.itemPerPage = data.rowsPerPage;
    this.totalPage = data.totalPages;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
