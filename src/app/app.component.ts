import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './auth/login-page.component';
import { AuthService } from './shared/services/auth.service';
import { GoogleMapsLoaderService } from './shared/services/google-place-api-loader.service';

@Component({
  selector: 'sman-root',
  imports: [
    RouterOutlet,
    FontAwesomeModule,
    LoginComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'school-management';
  constructor(
    public authService: AuthService,
    private googleMapsLoader: GoogleMapsLoaderService
  ) {}

  ngOnInit(): void {
    this.googleMapsLoader
      .loadGoogleMaps()
      .then(() => {})
      .catch((error) => {
        console.error('Error loading Google Maps script:', error);
      });
  }
}
