import { Component, EventEmitter, Output } from '@angular/core';
import { Params, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AccordionItemComponent } from "./accordion-item/accordion-item.component";
import { AccordionButtonComponent } from "./accordion-button/accordion-button.component";
import { NavigationService, route } from '../../services/navigation.service';
import { QueryService } from '../../services/filter.service';

@Component({
  selector: 'sman-sidebar',
  standalone: true,
  imports: [RouterLink, AccordionItemComponent, AccordionButtonComponent],
  templateUrl: './sidebar.component.html',
  // styleUrl: '',
  host: {
    // '(document:click)': 'hideMenu($event)'
  },
  schemas: []
})
export class SidebarComponent {

  // @Input() closeMenu!: () => void;
  @Output() selectMenuEvent = new EventEmitter<string>();

  constructor(
    private authService: AuthService,
    private navigateService: NavigationService,
    private queryService: QueryService,
  ) {

  }

  selectMenu(menuItem: string) {
    this.selectMenuEvent.emit(menuItem);
  }

  logOut() {
    this.authService.logOut();
  }

  navToMenu(url: route, params?: Params, backToRoot: boolean = false) {
    let queryParams = params;
    if (params && !backToRoot) {
      queryParams = this.queryService.addToCurrentParam(params);
    }
    this.navigateService.toRoute(url, queryParams);
  }
}
