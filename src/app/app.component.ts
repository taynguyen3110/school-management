import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StudentsComponent } from './students/student-page/students-page.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoginComponent } from './auth/login-page.component';
import { AuthService } from './shared/services/auth.service';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'sman-root',
  standalone: true,
  imports: [
    RouterOutlet,
    StudentsComponent,
    HeaderComponent,
    FontAwesomeModule,
    LoginComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'school-management';
  constructor(public authService: AuthService) {}
}
