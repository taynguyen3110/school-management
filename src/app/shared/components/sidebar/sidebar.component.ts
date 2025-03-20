import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ClickOutsideDirective } from '../../directives/clickOutside.directive';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { route } from '../../types';

@Component({
    selector: 'sman-sidebar',
    imports: [
        ClickOutsideDirective,
        SidebarItemComponent,
    ],
    templateUrl: './sidebar.component.html',
    schemas: []
})
export class SidebarComponent implements OnInit, OnChanges {
  @Input() selectedMenu: route = '';
  @Output() closeMenu = new EventEmitter<void>();
  @Output() selectMenu = new EventEmitter<route>();

  constructor(
    private authService: AuthService,
  ) {}

  ngOnChanges() {
  }

  ngOnInit() {}

  onSelectMenu(menu: route) {
    this.selectMenu.emit(menu);
  }

  hideMenu() {
    this.closeMenu.emit();
  }

  logOut() {
    this.authService.logOut();
  }
}
