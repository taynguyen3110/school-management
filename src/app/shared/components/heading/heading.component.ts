import { Component, Input, OnInit } from '@angular/core';

@Component({
    standalone: true,
    imports: [],
    selector: 'sman-heading',
    templateUrl: 'heading.component.html'
})

export class HeadingComponent implements OnInit {
    @Input() title: string = '';
    constructor() { }

    ngOnInit() { }
}