import { Component, EventEmitter, Output } from '@angular/core';
import { Params, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';
import { AccordionButtonComponent } from './accordion-button/accordion-button.component';
import { NavigationService, route } from '../../services/navigation.service';

@Component({
  selector: 'sman-sidebar',
  standalone: true,
  imports: [RouterLink, AccordionItemComponent, AccordionButtonComponent],
  templateUrl: './sidebar.component.html',
  schemas: [],
})
export class SidebarComponent {
  selectedMenu: route = '';

  constructor(
    private authService: AuthService,
    private navigateService: NavigationService,
  ) {}

  onSelectMenu(menu: route) {
    this.selectedMenu = menu;
    if (menu === '') {
      this.navigateService.toRoute('');
    }
  }

  logOut() {
    this.authService.logOut();
  }
}
