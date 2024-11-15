import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UserProfile } from '../../types';
import { AuthApiService } from '../../services/authApi.service';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'sman-header',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() isShow: boolean = false;
  @Input() title: string = '';
  @Output() show = new EventEmitter<void>();
  constructor(private router: Router) {}

  displayMenu() {
    this.isShow = true;
    this.show.emit();
  }

  goToUserInfo() {
    this.router.navigate(['/user']);
  }
}
