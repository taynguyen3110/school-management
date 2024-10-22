import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClickOutsideDirective } from '../../directives/clickOutside.directive';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    imports: [ClickOutsideDirective, CommonModule],
    selector: 'sman-multiselector',
    templateUrl: 'multiselector.component.html',
    styleUrl: 'multiselector.component.scss'
})

export class MultiSelectorComponent {
    @Input() items: { id: string, label: string }[] = []
    @Input() selected: string[] = []
    @Output() select = new EventEmitter<string[]>()

    constructor(private el: ElementRef<HTMLElement>) { }

    isShow: boolean = false;
    selectedItem: string[] = []

    ngOnInit() {
        this.selectedItem = this.selected;
    }

    hideItem = () => {
        this.isShow = false;
    }

    showItem() {
        this.isShow = true;
    }

    selectItem(id: string) {
        if (!this.selectedItem.includes(id)) {
            this.selectedItem.push(id);
        } else {
            this.selectedItem = this.selectedItem.filter(i => i !== id);
        }
        this.select.emit(this.selectedItem);
    }
}