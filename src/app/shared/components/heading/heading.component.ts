import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    imports: [CommonModule],
    selector: 'sman-heading',
    templateUrl: 'heading.component.html'
})

export class HeadingComponent implements OnInit {
    @Input() title: string = '';
    @Input() spacing: number = 12;
    @Input() heading: number = 2;
    @Input() classname: string = '';
    constructor() { }

    ngOnInit() { }
}