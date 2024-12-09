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

@Component({
  selector: 'sman-parents',
  standalone: true,
  imports: [
    ItemTableComponent,
    PaginationComponent,
    AddParentComponent,
    PageLayoutComponent,
    FilterComponent,
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

  addFormIsDirty: boolean = false;

  unsubscribe$ = new Subject<void>();

  readonly dialog = inject(MatDialog);

  constructor(
    private parentsService: ParentsService,
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
            'parents',
            'add',
            { page: this.currentPage },
            true,
          );
        } else {
          this.currentPage = +params['page'];
          this.fetchParents(params).subscribe((data: any) => {
            this.setPagination(data);
          });
        }
      });
  }

  openDialog(): void {
    this.addFormIsDirty = true;
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
    this.navigationService.toRoute('parents', 'delete', ['name', 'classIds']);
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
