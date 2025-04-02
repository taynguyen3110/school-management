import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'sman-pagination',
    imports: [CommonModule, ButtonComponent],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnChanges {
  @Input() pageSize!: number;
  @Input() totalCount!: number;
  @Input() currentPage!: number;
  @Output() pageChange = new EventEmitter<number>();

  lastPage!: number;
  DOTS = '...';
  arr: any[] = [];

  ngOnInit() {
    this.lastPage = Math.ceil(this.totalCount / this.pageSize);
    this.arr = this.generatePagination(this.currentPage, this.lastPage);
  }

  ngOnChanges() {
    this.lastPage = Math.ceil(this.totalCount / this.pageSize);
    this.arr = this.generatePagination(this.currentPage, this.lastPage);
  }

  handlePrevious() {
    this.currentPage = this.currentPage > 1 ? this.currentPage - 1 : 1;
    this.updatePagination();
  }

  handleNext() {
    this.currentPage =
      this.currentPage < this.lastPage ? this.currentPage + 1 : this.lastPage;
    this.updatePagination();
  }

  handleJumpToPage(page: number) {
    if (typeof page === 'number') {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  updatePagination() {
    this.arr = this.generatePagination(this.currentPage, this.lastPage);
    this.pageChange.emit(this.currentPage);
  }

  generatePagination(current: number, last: number): any[] {
    if (last <= 5) {
      return Array.from({ length: last }, (_, i) => i + 1);
    }
    if (current <= 2) {
      return [1, 2, 3, this.DOTS, last];
    } else if (current >= last - 1) {
      return [1, this.DOTS, last - 2, last - 1, last];
    } else {
      return [1, this.DOTS, current - 1, current, current + 1, this.DOTS, last];
    }
  }
}
