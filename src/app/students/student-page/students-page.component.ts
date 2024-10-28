import { Component } from '@angular/core';
import { PaginationComponent } from "../../shared/components/pagination/pagination.component";
import { AddStudentComponent } from "../student-add/student-add.component";
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { NavigationService } from '../../shared/services/navigation.service';
import { Subject, takeUntil } from 'rxjs';
import { StudentService } from '../service/student.service';
import { Student } from '../../shared/types';
import { QueryService } from '../../shared/services/filter.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiSelectorComponent } from "../../shared/components/multiselector/multiselector.component";
import { ItemTableComponent } from "../../shared/components/item-table/item-table.component";
import { StudentsFilterComponent } from "../student-filter/students-filter.component";

@Component({
  selector: 'sman-students, students',
  standalone: true,
  imports: [PaginationComponent, AddStudentComponent, RouterLink, ReactiveFormsModule, MultiSelectorComponent, ItemTableComponent, StudentsFilterComponent],
  templateUrl: './students-page.component.html',
  styleUrl: './students-page.component.scss'
})
export class StudentsComponent {
  studentsCount: number = 0;
  itemPerPage: number = 0;
  totalPage: number = 0;
  students: Student[] = [];
  displayAddStudent: boolean = false;
  currentPage: number = 1;
  filterParams: Params = {};

  unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private studentService: StudentService,
    private queryService: QueryService,
  ) {
  }

  ngOnInit() {
    this.displayAddStudent = this.route.snapshot.queryParamMap.get('addStudent') === "true";
    this.route.queryParams
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((params) => {
        this.displayAddStudent = params['addStudent'] === "true";
        this.filterParams = params;
        if (!params['page']) {
          const newParam = this.queryService.setParam(params, { page: this.currentPage });
          this.applyQueryChanges(newParam)
        } else {
          this.currentPage = +params['page'];
          this.fetchStudents(params).subscribe((data: any) => {
            this.setPagination(data);
          })
        }
      })
  }

  fetchStudents(filter?: Params) {
    return this.studentService.getStudents(filter);
  }

  applyQueryChanges(param: Params) {
    this.navigationService.toRoute('students', param, true);
  }

  handlePageChange(page: number) {
    const newParams = this.queryService.addToCurrentParam({ page });
    this.applyQueryChanges(newParams);
  }

  showAddStudentForm() {
    this.displayAddStudent = true;
  }

  hideAddStudentForm = () => {
    const newParams = this.queryService.deleteFromCurrentParam('addStudent');
    this.navigationService.toRoute("students", newParams, true);
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
