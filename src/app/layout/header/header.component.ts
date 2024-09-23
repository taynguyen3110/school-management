import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'sman-header',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  displayMenu = false;
  selectedMenu = "Dashboard";

  showMenu() {
    this.displayMenu = true;
  }

  hideMenu = () => {
    this.displayMenu = false;
  }

  selectMenu(item: string) {
    this.selectedMenu = item;
  }
}
