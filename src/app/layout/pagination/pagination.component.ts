import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sman-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() pageSize!: number;
  @Input() totalCount!: number;
  @Input() sibling!: number;
  @Output() pageChange = new EventEmitter<number>();

  currentPage: number = 1;
  lastPage!: number;
  DOTS = "...";
  arr: any[] = [];

  ngOnChanges() {
    this.lastPage = Math.ceil(this.totalCount / this.pageSize);
    this.arr = this.generatePagination(this.currentPage, this.lastPage);
  }

  handlePrevious() {
    this.currentPage = this.currentPage > 1 ? this.currentPage - 1 : 1;
    this.arr = this.generatePagination(this.currentPage, this.lastPage);
    this.pageChange.emit(this.currentPage);
  }

  handleNext() {
    this.currentPage = this.currentPage < this.lastPage ? this.currentPage + 1 : this.lastPage;
    this.arr = this.generatePagination(this.currentPage, this.lastPage);
    this.pageChange.emit(this.currentPage);
  }

  generatePagination(current: number, last: number): any[] {
    let displayArr: any[] = [];
    if (current <= 3) {
      displayArr = [1, 2, 3, this.DOTS, last];
    } else if (current >= last - 2) {
      displayArr = [1, this.DOTS, last - 2, last - 1, last];
    } else {
      displayArr = [1, this.DOTS, current - 1, current, current + 1, this.DOTS, last];
    }
    return displayArr;
  }
}
