import { TreeKeyManager } from '@angular/cdk/a11y';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Params, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink, TitleCasePipe, DatePipe, CommonModule],
  selector: 'sman-item-table',
  templateUrl: 'item-table.component.html',
  styleUrl: 'item-table.component.scss',
})
export class ItemTableComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() listOf: string = '';
  @Input() fromDashboard: boolean = false;

  @Output() sort = new EventEmitter<Params>();

  sortOrder: -1 | 0 | 1 = 0;

  constructor() {}

  ngOnInit() {}

  onSort(sortBy: string) {
    this.sortOrder == 1 ? (this.sortOrder = -1) : this.sortOrder++;
    switch (this.sortOrder) {
      case -1:
        this.sort.emit({ sortBy, order: 'desc' });
        break;
      case 0:
        this.sort.emit({ isNotSort: true });
        break;
      case 1:
        this.sort.emit({ sortBy, order: 'asc' });
        break;
    }
  }
}
