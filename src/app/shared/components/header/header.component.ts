import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UserProfile } from '../../types';
import { AuthApiService } from '../../services/authApi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sman-header',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './header.component.html',
  // styleUrl: ''
})
export class HeaderComponent {
  private router = inject(Router);

  // displayMenu = false;
  // selectedMenu = "Dashboard";

  // showMenu() {
  //   this.displayMenu = true;
  // }

  // hideMenu = () => {
  //   this.displayMenu = false;
  // }

  // selectMenu(item: string) {
  //   this.selectedMenu = item;
  //   this.hideMenu();
  // }

  goToUserInfo() {
    this.router.navigate(['/user']);
  }
}
