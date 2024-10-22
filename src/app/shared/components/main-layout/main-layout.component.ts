import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HeaderComponent } from "../header/header.component";

@Component({
    standalone: true,
    imports: [RouterOutlet, SidebarComponent, HeaderComponent],
    selector: 'sman-main-layout',
    templateUrl: 'main-layout.component.html'
})

export class MainLayoutComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}