import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';
import { AccordionButtonComponent } from './accordion-button/accordion-button.component';
import { NavigationService, route } from '../../services/navigation.service';
import { ClickOutsideDirective } from '../../directives/clickOutside.directive';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';

@Component({
  selector: 'sman-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    AccordionItemComponent,
    AccordionButtonComponent,
    ClickOutsideDirective,
    SidebarItemComponent,
  ],
  templateUrl: './sidebar.component.html',
  schemas: [],
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
