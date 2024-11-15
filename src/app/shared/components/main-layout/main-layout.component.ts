import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { BackdropLayerComponent } from '../backdrop-layer/backdrop-layer.component';
import { CommonModule } from '@angular/common';
import { route } from '../../services/navigation.service';

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    BackdropLayerComponent,
    CommonModule,
  ],
  selector: 'sman-main-layout',
  templateUrl: 'main-layout.component.html',
})
export class MainLayoutComponent implements OnInit {
  showMenu: boolean = false;
  selectedMenu: route = '';

  constructor(private router: ActivatedRoute) {}

  ngOnInit() {
    this.selectedMenu = this.router.snapshot.firstChild?.routeConfig
      ?.path as route;
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
