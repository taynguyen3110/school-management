import { Component, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthApiService } from '../../services/authApi.service';

@Component({
  selector: 'sman-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  host: {
    '(document:click)': 'hideMenu($event)'
  }
})
export class SidebarComponent {

  @Input() closeMenu!: () => void;
  @Output() selectMenuEvent = new EventEmitter<string>();

  private authService = inject(AuthService);
  private authApi = inject(AuthApiService);

  selectMenu(menuItem: string) {
    this.selectMenuEvent.emit(menuItem);
  }

  logOut() {
    this.authService.logOut();
  }

  hideMenu(event: MouseEvent) {
    const clickedEl = event.target as HTMLElement;
    const sidebar = document.getElementById('sidebar');
    if (sidebar && !sidebar.contains(clickedEl)) {
      this.closeMenu();
    }
  }
}
