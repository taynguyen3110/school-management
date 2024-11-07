import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
    standalone: true,
    imports: [],
    selector: 'sman-stats-wrapper',
    templateUrl: 'stats-wrapper.component.html'
})

export class StatsWrapperComponent implements OnInit, OnChanges {
    @Input() label: string = '';
    @Input() width: number = 0;
    @Input() height: number = 0;

    chartWidth: string = '';
    chartHeight: string = '';

    constructor() {
    }

    ngOnChanges() {
        this.chartWidth = `${this.width}px`
        this.chartHeight = `${this.height}px`
    }

    ngOnInit() {
    }
}