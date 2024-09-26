import { Component } from '@angular/core';
import { STUDENTS } from '../../mock/mockStudents';
import { PaginationComponent } from "../layout/pagination/pagination.component";

@Component({
  selector: 'sman-students, students',
  standalone: true,
  imports: [PaginationComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {
  data = STUDENTS;
  students = this.data.slice(0, 4);
  studentsCount = this.data.length;
  itemPerPage = 4;

  handlePageChange(page: number) {
    let endItem = (this.itemPerPage * page);
    let startItem = endItem - this.itemPerPage;
    this.students = this.data.slice(startItem, endItem);
  }
}
