import { Component, Input } from '@angular/core';

@Component({
  selector: 'sman-add-student',
  standalone: true,
  imports: [],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.scss'
})
export class AddStudentComponent {
  @Input() cancelAddStudent!: () => void
}
