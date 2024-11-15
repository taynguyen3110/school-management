import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'sman-stats-cell',
  templateUrl: 'stats-cell.component.html',
})
export class StatsCellComponent implements OnInit {
  @Input() label: string = '';
  @Input() color: string = '';
  @Input() icon: boolean = true;
  @Input() stats: number | string = 0;


  constructor() {}

  ngOnInit() {
  }
}
