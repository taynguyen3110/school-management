import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { BackdropLayerComponent } from '../backdrop-layer/backdrop-layer.component';
import { CommonModule } from '@angular/common';
import { route } from '../../types';
import { filter } from 'rxjs';

@Component({
    imports: [
        RouterOutlet,
        SidebarComponent,
        HeaderComponent,
        LoadingSpinnerComponent,
        BackdropLayerComponent,
        CommonModule,
    ],
    selector: 'sman-main-layout',
    templateUrl: 'main-layout.component.html'
})
export class MainLayoutComponent implements OnInit {
  showMenu: boolean = false;
  selectedMenu: route = '';

  constructor(private activeRouter: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.selectedMenu = this.activeRouter.firstChild?.routeConfig
      ?.path as route;
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.selectedMenu = this.activeRouter.firstChild?.routeConfig
          ?.path as route;
      });
  }

  setSelectedMenu(menu: route) {
    this.selectedMenu = menu;
  }

  displayMenu() {
    this.showMenu = true;
  }

  hideMenu() {
    this.showMenu = false;
  }
}
