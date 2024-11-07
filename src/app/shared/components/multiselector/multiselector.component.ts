import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ClickOutsideDirective } from '../../directives/clickOutside.directive';
import { CommonModule } from '@angular/common';
import { IdToLabelPipe } from '../../pipes/idToLabel';
import { FormsModule } from '@angular/forms';
import { debounceTime, fromEvent } from 'rxjs';

@Component({
  standalone: true,
  imports: [ClickOutsideDirective, CommonModule, IdToLabelPipe, FormsModule],
  selector: 'sman-multiselector',
  templateUrl: 'multiselector.component.html',
  styleUrl: 'multiselector.component.scss',
})
export class MultiSelectorComponent implements OnChanges, AfterViewInit {
  @Input() items: { id: string; label: string }[] = [];
  @Input() selected: string[] = [];
  @Input() placeholder: string = '';
  @Input() lookUp: boolean = false;
  @Input() supportMulti: boolean = false;

  @Output() inputTyped = new EventEmitter<string>();
  @Output() select = new EventEmitter<string[] | string>();

  @ViewChild('searchInput') searchInputRef!: ElementRef;

  searchValue: string = '';
  isShow: boolean = false;
  selectedItem: string[] = [];
  constructor() {}

  ngOnChanges() {
    this.selectedItem = this.selected;
    if (!this.supportMulti) {
      this.searchValue = this.selected[0];
    }
  }

  ngAfterViewInit() {
    if (this.lookUp) {
      const inputTyped = fromEvent(
        this.searchInputRef.nativeElement,
        'input',
      ).pipe(debounceTime(1000));
      inputTyped.subscribe(() => {
        this.inputTyped.emit(this.searchValue);
        if (this.searchValue !== '') {
          this.isShow = true;
        }
      });
    }
  }

  hideItem = () => {
    this.isShow = false;
  };

  showItem() {
    this.isShow = !this.isShow;
  }

  selectItem(id: string) {
    if (this.supportMulti) {
      if (!this.selectedItem.includes(id)) {
        this.selectedItem.push(id);
      } else {
        this.selectedItem = this.selectedItem.filter((i) => i !== id);
      }
      this.select.emit(this.selectedItem as string[]);
    } else {
      this.searchValue = this.items.filter((i) => i.id === id)[0].label;
      this.selectedItem = [id];
      this.select.emit(id);
    }
  }
}
