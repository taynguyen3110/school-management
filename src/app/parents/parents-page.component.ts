import { Component } from '@angular/core';
import { ItemTableComponent } from '../shared/components/item-table/item-table.component';
import { Parent } from '../shared/types';
import { ParentsService } from './services/parents.service';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';
import { ActivatedRoute, Params } from '@angular/router';
import { NavigationService } from '../shared/services/navigation.service';
import { QueryService } from '../shared/services/filter.service';
import { Subject, takeUntil } from 'rxjs';
import { AddParentComponent } from './parent-add/parent-add.component';
import { ParentFilterComponent } from "./parent-filter/parent-filter.component";

@Component({
  selector: 'sman-parents',
  standalone: true,
  imports: [ItemTableComponent, PaginationComponent, AddParentComponent, ParentFilterComponent],
  templateUrl: './parents-page.component.html',
  styleUrl: './parents-page.component.scss'
})
export class ParentsComponent {
  parentsCount: number = 0;
  itemPerPage: number = 0;
  totalPage: number = 0;
  parents: Parent[] = [];
  displayAddParent: boolean = false;
  currentPage: number = 1;
  filterParams: Params = {};

  unsubscribe$ = new Subject<void>()

  constructor(
    private parentsService: ParentsService,
    private navigationService: NavigationService,
    private queryService: QueryService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.displayAddParent = this.route.snapshot.queryParamMap.get('addParent') === "true";
    this.route.queryParams
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((params) => {
        this.displayAddParent = params['addParent'] === "true";
        this.filterParams = params
        if (!params['page']) {
          const newParam = this.queryService.setParam(params, { page: this.currentPage });
          this.applyQueryChanges(newParam);
        } else {
          this.currentPage = +params['page'];
          this.fetchParents(params).subscribe((data: any) => {
            this.setPagination(data);
          })
        }
      })
  }

  fetchParents(filter?: Params) {
    return this.parentsService.getParents(filter);
  }

  applyQueryChanges(param: Params) {
    this.navigationService.toRoute('parents', param, true);
  }

  handlePageChange(page: number) {
    const newParams = this.queryService.addToCurrentParam({ page });
    this.applyQueryChanges(newParams);
  }

  setPagination(data: any) {
    this.parents = data.parents;
    this.parentsCount = data.total;
    this.itemPerPage = data.rowsPerPage;
    this.totalPage = data.totalPages;
  }

  showAddParentForm() {
    this.displayAddParent = true;
  }

  hideAddParentForm = () => {
    const newParams = this.queryService.deleteFromCurrentParam('addParent');
    this.navigationService.toRoute("parents", newParams, true);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
