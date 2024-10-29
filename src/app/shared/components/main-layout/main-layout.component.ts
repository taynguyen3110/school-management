import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HeaderComponent } from "../header/header.component";
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
    standalone: true,
    imports: [RouterOutlet, SidebarComponent, HeaderComponent, LoadingSpinnerComponent],
    selector: 'sman-main-layout',
    templateUrl: 'main-layout.component.html'
})

export class MainLayoutComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}