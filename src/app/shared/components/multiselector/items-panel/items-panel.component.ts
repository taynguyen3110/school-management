import { ClickOutsideDirective } from '@/app/shared/directives/clickOutside.directive';
import { LabelObj } from '@/app/shared/types';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { fromEvent, debounceTime } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ClickOutsideDirective],
  selector: 'sman-items-panel',
  templateUrl: 'items-panel.component.html',
})
export class ItemsPanelComponent implements OnInit, AfterViewInit {
  @Input() lookUp: boolean = false;
  @Input() items: { id: string; label: string }[] = [];
  @Input() selectedItem: { id: string; label: string }[] = [];

  @Output() inputTyped = new EventEmitter<string>();
  @Output() clickedOutside = new EventEmitter<void>();
  @Output() select = new EventEmitter<LabelObj>();

  @ViewChild('searchInput') searchInputRef!: ElementRef;

  searchValue: string = '';

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.searchInit();
  }

  searchInit() {
    if (this.lookUp) {
      const inputTyped = fromEvent(
        this.searchInputRef.nativeElement,
        'input'
      ).pipe(debounceTime(1000));
      inputTyped.subscribe(() => {
        this.inputTyped.emit(this.searchValue);
      });
    }
  }

  hidePanel() {
    this.clickedOutside.emit();
  }

  selectItem(item: LabelObj) {
    this.select.emit(item);
  }

  checkItemSelected(item: LabelObj) {
    return !!this.selectedItem.find((i) => i.id === item.id);
  }
}
