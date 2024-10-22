import { Component } from '@angular/core';
import { PaginationComponent } from "../../shared/components/pagination/pagination.component";
import { AddStudentComponent } from "../../shared/components/add-student/add-student.component";
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { NavigationService } from '../../shared/services/navigation.service';
import { Subject, takeUntil } from 'rxjs';
import { StudentService } from '../service/student.service';
import { Class, Student } from '../../shared/types';
import { QueryService } from '../../shared/services/filter.service';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectorComponent } from "../../shared/components/multiselector/multiselector.component";

@Component({
  selector: 'sman-students, students',
  standalone: true,
  imports: [PaginationComponent, AddStudentComponent, RouterLink, ReactiveFormsModule, MultiSelectorComponent],
  templateUrl: './students-page.component.html',
  styleUrl: './students-page.component.scss'
})
export class StudentsComponent {
  studentsCount!: number;
  itemPerPage!: number;
  totalPage!: number;
  students: Student[] = [];
  displayAddStudent: boolean = false;
  currentPage: number = 1;
  selectedClasses: string[] = [];

  classes: Class[] = [];

  unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private studentService: StudentService,
    private queryService: QueryService,
    private fb: FormBuilder
  ) {
  }

  filterStudentForm = this.fb.group({
    name: ['', [

    ]],
    classIds: ['', [

    ]]
  })

  get name() {
    return this.filterStudentForm.get('name') as FormControl
  }

  get classIds() {
    return this.filterStudentForm.get('classIds') as FormControl
  }

  ngOnInit() {
    this.displayAddStudent = this.route.snapshot.queryParamMap.get('addStudent') === "true";
    this.getQueryParams();
    this.route.queryParams
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((params) => {
        this.displayAddStudent = params['addStudent'] === "true";
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
    this.studentService.getClasses().subscribe((classes) => {
      this.classes = classes
    })
  }

  getQueryParams() {
    const currentParams = this.route.snapshot.queryParams;
    this.currentPage = +currentParams['page'];
    this.name.setValue(currentParams['name']);
    this.selectedClasses = currentParams['classIds'].split(',');
  }

  classList() {
    return this.classes.map((c) => {
      return { id: c.id, label: c.name }
    })
  }

  fetchStudents(filter?: Params) {
    return this.studentService.getStudents(filter);
  }

  filterStudents() {
    const newParams = this.queryService.addToCurrentParam({ ...this.filterStudentForm.value, page: 1 });
    this.navigationService.toRoute('students', newParams, true);
  }

  updateClassFilter(classes: string[]) {
    this.filterStudentForm.setValue({ name: this.name.value, classIds: classes.join(',') })
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
