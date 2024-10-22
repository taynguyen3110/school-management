import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
    selector: '[clickOutside]',
    standalone: true
})
export class ClickOutsideDirective {
    @Output() clickOutside = new EventEmitter<void>()
    constructor(private el: ElementRef<HTMLElement>) {
        document.addEventListener('click', this.hideItem)
    }

    hideItem = (event: MouseEvent) => {
        const thisEl = this.el.nativeElement;
        if (!thisEl.contains(event.target as Node)) {
            this.clickOutside.emit()
        }
    }

    ngOnDestroy() {
        document.removeEventListener('click', this.hideItem)
    }
}