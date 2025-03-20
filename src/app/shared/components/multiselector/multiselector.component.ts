import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ValidationErrors } from '@angular/forms';
import { ItemsPanelComponent } from './items-panel/items-panel.component';
import { LabelObj } from '../../types';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    ItemsPanelComponent,
  ],
  selector: 'sman-multiselector',
  templateUrl: 'multiselector.component.html',
  styleUrl: 'multiselector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectorComponent
  implements OnChanges, OnInit, AfterViewInit
{
  @Input() lookUp: boolean = false;
  @Input() validation: boolean = true;
  @Input() items: { id: string; label: string }[] = [];
  @Input() selected: { id: string; label: string }[] = [];
  @Input() placeholder: string = '';
  @Input() supportMulti: boolean = false;
  @Input() hasError: ValidationErrors = {};
  @Input() errMsgs: { [key: string]: string } = {};

  @Output() inputTyped = new EventEmitter<string>();
  @Output() select = new EventEmitter<string[] | string>();

  isTouched: boolean = false;
  fieldInvalid: boolean = false;
  selectedItem: { id: string; label: string }[] = [];
  isShow: boolean = false;
  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selected'] && !this.validation) {
      this.selectedItem = this.selected;
    }
  }

  ngOnInit(): void {
    if (this.selected.length !== 0) {
      this.selectedItem = this.selected;
    }
  }

  ngAfterViewInit() {}

  hideItem = () => {
    this.isShow = false;
    if (true) {
      this.checkFieldValid();
    }
  };

  lookupItems(searchValue: string) {
    this.inputTyped.emit(searchValue);
  }

  setIsTouched() {
    this.isTouched = true;
  }

  showItem() {
    this.setIsTouched();
    this.isShow = true;
  }

  checkFieldValid() {
    if (this.validation && this.isTouched && this.selectedItem.length == 0) {
      this.fieldInvalid = true;
    } else {
      this.fieldInvalid = false;
    }
  }

  get errorKeys() {
    return Object.keys(this.hasError);
  }

  selectItem(item: LabelObj, e?: Event) {
    e?.stopPropagation();
    this.isTouched = true;
    if (this.supportMulti) {
      if (!this.selectedItem.find((i) => i.id === item.id) && item.label) {
        this.selectedItem.push(item);
      } else {
        this.selectedItem = this.selectedItem.filter((i) => i.id !== item.id);
      }
    this.select.emit(this.selectedItem.map((i) => i.id) as string[]);

    } else {
      if (this.selectedItem[0] === item) {
        this.selectedItem = [];
      } else {
        this.selectedItem = [item];
      }
      this.select.emit(this.selectedItem[0].id as string);
    }
    this.checkFieldValid();
  }
}
