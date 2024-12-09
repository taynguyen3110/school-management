import { Component, inject } from '@angular/core';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { AddStudentComponent } from '../student-add/student-add.component';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NavigationService } from '../../shared/services/navigation.service';
import { Subject, takeUntil } from 'rxjs';
import { StudentService } from '../service/student.service';
import { Student } from '../../shared/types';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiSelectorComponent } from '../../shared/components/multiselector/multiselector.component';
import { ItemTableComponent } from '../../shared/components/item-table/item-table.component';
import { PageLayoutComponent } from '../../shared/components/page-layout/page-layout.component';
import { FilterComponent } from '../../shared/components/filter/filter.component';
import { HeadingComponent } from '@/app/shared/components/heading/heading.component';
import { ButtonComponent } from '@/app/shared/components/button/button.component';

@Component({
  selector: 'sman-students, students',
  standalone: true,
  imports: [
    PaginationComponent,
    RouterLink,
    ReactiveFormsModule,
    MultiSelectorComponent,
    ItemTableComponent,
    AddStudentComponent,
    PageLayoutComponent,
    FilterComponent,
    HeadingComponent,
    ButtonComponent,
  ],
  templateUrl: './students-page.component.html',
  styleUrl: './students-page.component.scss',
})
//  implements CanComponentDeactivate
export class StudentsComponent {
  studentsCount: number = 0;
  itemPerPage: number = 0;
  totalPage: number = 0;
  students: Student[] = [];
  currentPage: number = 1;
  filterParams: Params = {};

  unsubscribe$ = new Subject<void>();

  readonly dialog = inject(MatDialog);

  constructor(
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private studentService: StudentService
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
          this.currentPage = +params['page'];
          this.fetchStudents(params).subscribe((data: any) => {
            this.setPagination(data);
          });
        }
      });
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
