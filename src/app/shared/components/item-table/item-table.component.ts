import { TreeKeyManager } from '@angular/cdk/a11y';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Params, RouterLink } from '@angular/router';
import { ScreenService } from '../../services/screen.service';

@Component({
    imports: [RouterLink, TitleCasePipe, DatePipe, CommonModule],
    selector: 'sman-item-table',
    templateUrl: 'item-table.component.html',
    styleUrl: 'item-table.component.scss'
})
export class ItemTableComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() enableSorting: boolean = true;
  @Input() listOf!:
    | 'students'
    | 'parents'
    | 'teachers'
    | 'subjects'
    | 'classes';
  @Input() fromDashboard: boolean = false;

  @Output() sort = new EventEmitter<Params>();

  tableCollumns: { key: string; label: string }[] = [];
  sortOrder: -1 | 0 | 1 = 0;
  currentSort: string = '';

  columnConfigurations!: {
    students: { key: string; label: string }[];
    parents: { key: string; label: string }[];
    teachers: { key: string; label: string }[];
    classes: { key: string; label: string }[];
    subjects: { key: string; label: string }[];
  };

  constructor(private screenService: ScreenService) {}

  ngOnInit() {
    this.columnConfigurations = {
      students: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'gender', label: 'Gender' },
        { key: 'email', label: 'Email' },
        { key: 'admissionDate', label: 'Admission Date' },
      ],
      parents: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
      ],
      teachers: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'admissionDate', label: 'Admission Date' },
      ],
      subjects: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'class', label: 'Class' },
        { key: 'teacher', label: 'Teacher' },
      ],
      classes: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
      ],
    };
    this.getCollumns();
  }

  getCollumns() {
    this.screenService.observeScreen('md').subscribe((result) => {
      this.tableCollumns = result
        ? this.columnConfigurations[this.listOf]
        : this.columnConfigurations[this.listOf].filter(
            (col) => col.key !== 'email'
          );
    });
  }

  onSort(sortBy: string) {
    if (sortBy === this.currentSort) {
      this.sortOrder == 1 ? (this.sortOrder = -1) : this.sortOrder++;
      this.applySort(sortBy);
    } else {
      this.currentSort = sortBy;
      this.sortOrder = 1;
      this.applySort(sortBy);
    }
  }

  applySort(sortBy: string) {
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
