import { Component } from '@angular/core';
import { Classes } from '../shared/types';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { NavigationService } from '../shared/services/navigation.service';
import { AddClassComponent } from './classes-add/classes-add.component';
import { ItemTableComponent } from '../shared/components/item-table/item-table.component';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';
import { ClassesService } from './services/classes.service';
import { PageLayoutComponent } from "../shared/components/page-layout/page-layout.component";
import { FilterComponent } from "../shared/components/filter/filter.component";

@Component({
  selector: 'sman-classes',
  standalone: true,
  imports: [ItemTableComponent, PaginationComponent, AddClassComponent, PageLayoutComponent, FilterComponent],
  templateUrl: './classes-page.component.html',
})
export class ClassesComponent {
  classesCount: number = 0;
  itemPerPage: number = 0;
  totalPage: number = 0;
  classes: Classes[] = [];
  displayAddClass: boolean = false;
  currentPage: number = 1;
  filterParams: Params = {};

  unsubscribe$ = new Subject<void>()

  constructor(
    private classesService: ClassesService,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.displayAddClass = this.route.snapshot.queryParamMap.get('addClass') === "true";
    this.route.queryParams
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((params) => {
        this.displayAddClass = params['addClass'] === "true";
        this.filterParams = params;
        if (!params['page']) {
          this.navigationService.toRoute('classes', 'add', { page: this.currentPage }, true);
        } else {
          this.currentPage = +params['page'];
          this.fetchClass(params).subscribe((data: any) => {
            this.setPagination(data);
          })
        }
      })
  }

  fetchClass(filter?: Params) {
    return this.classesService.getClasses(filter);
  }

  handlePageChange(page: number) {
    this.navigationService.toRoute('classes', 'add', { page }, true);
  }

  setPagination(data: any) {
    this.classes = data.classes;
    this.classesCount = data.total;
    this.itemPerPage = data.rowsPerPage;
    this.totalPage = data.totalPages;
  }

  showAddForm() {
    this.displayAddClass = true;
  }

  hideAddForm = () => {
    this.navigationService.toRoute("classes", 'delete', ['addClass'], true);
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

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
