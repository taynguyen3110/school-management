import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UserProfile } from '../../types';
import { AuthApiService } from '../../services/authApi.service';
import { Router } from '@angular/router';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { UserIconComponent } from './user-icon/user-icon.component';

@Component({
    selector: 'sman-header',
    imports: [TitleCasePipe, CommonModule, UserIconComponent],
    templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Input() isShow: boolean = false;
  @Input() title: string = '';
  @Output() show = new EventEmitter<void>();

  constructor(private router: Router) {}

  displayMenu(e: Event) {
    e.stopPropagation();
    this.show.emit();
  }

  goToUserInfo() {
    this.router.navigate(['/user']);
  }
}
