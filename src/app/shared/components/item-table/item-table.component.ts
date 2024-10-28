import { TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    standalone: true,
    imports: [RouterLink, TitleCasePipe],
    selector: 'sman-item-table',
    templateUrl: 'item-table.component.html',
    styleUrl: 'item-table.component.scss'
})

export class ItemTableComponent implements OnInit {
    @Input() items: any[] = []
    @Input() listOf: string = ''
    constructor() { }

    ngOnInit() {
        // console.log(this.listOf);
     }
}