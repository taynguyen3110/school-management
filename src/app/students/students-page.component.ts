import { Component } from '@angular/core';
import { STUDENTS } from '../../mock/mockStudents';
import { PaginationComponent } from "../shared/components/pagination/pagination.component";
import { AddStudentComponent } from "../shared/components/add-student/add-student.component";
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'sman-students, students',
  standalone: true,
  imports: [PaginationComponent, AddStudentComponent],
  templateUrl: './students-page.component.html',
  styleUrl: './students-page.component.scss'
})
export class StudentsComponent {
  data = STUDENTS;
  studentsCount = this.data.length;
  itemPerPage:number = 4;
  students = this.data.slice(0, this.itemPerPage);
  displayForm: boolean = false;

  constructor(private authService: AuthService) {
  }

  handlePageChange(page: number) {
    let endItem = (this.itemPerPage * page);
    let startItem = endItem - this.itemPerPage;
    this.students = this.data.slice(startItem, endItem);
  }

  showAddStudentForm() {
    this.displayForm = true;
  }

  hideAddStudentForm = () => {
    this.displayForm = false;
  }
}
