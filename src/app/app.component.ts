import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StudentsComponent } from "./students/students.component";
import { HeaderComponent } from "./layout/header/header.component";

@Component({
  selector: 'sman-root',
  standalone: true,
  imports: [RouterOutlet, StudentsComponent, HeaderComponent, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'school-management';
}
