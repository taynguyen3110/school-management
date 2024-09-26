import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'sman-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() closeMenu!: () => void;
  @Output() selectMenuEvent = new EventEmitter<string>();

  selectMenu(menuItem : string) {
    this.selectMenuEvent.emit(menuItem);
  }
}
