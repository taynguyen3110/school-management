import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'sman-stats-wrapper',
  templateUrl: 'stats-wrapper.component.html',
})
export class StatsWrapperComponent implements OnInit, OnChanges {
  @Input() isChart?: boolean = false;

  constructor() {}

  ngOnChanges() {}

  ngOnInit() {}
}
