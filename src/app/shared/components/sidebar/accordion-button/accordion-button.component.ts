import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationService } from '../../../services/navigation.service';
import { Params } from '@angular/router';
import { route } from '@/app/shared/types';

@Component({
    imports: [],
    selector: 'accordion-button',
    templateUrl: 'accordion-button.component.html'
})
export class AccordionButtonComponent {
  @Input() title: string = '';
  @Input() url: route = '';
  @Input() action: '' | 'add' | 'delete' = '';
  @Input() params: Params = {};
  @Input() replaceUrl: boolean = false;

  constructor(private navigationService: NavigationService) {}

  handleClick() {
    this.navigationService.toRoute(
      this.url,
      this.action,
      this.params,
      this.replaceUrl,
    );
  }
}
