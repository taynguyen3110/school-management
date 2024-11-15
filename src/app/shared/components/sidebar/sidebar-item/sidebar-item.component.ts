import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
    standalone: true,
    imports: [TitleCasePipe, CommonModule, RouterLink, RouterModule],
    selector: 'sman-sidebar-item',
    templateUrl: 'sidebar-item.component.html'
})

export class SidebarItemComponent implements OnInit {
    @Input() title: string = '';
    @Input() isActive: boolean = false;
    @Output() selected = new EventEmitter<void>(); 
    constructor() { }

    ngOnInit() { }

    select() {
        this.selected.emit();
    }
}