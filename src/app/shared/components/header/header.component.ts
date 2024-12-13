import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UserProfile } from '../../types';
import { AuthApiService } from '../../services/authApi.service';
import { Router } from '@angular/router';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { UserIconComponent } from './user-icon/user-icon.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'sman-header',
  imports: [TitleCasePipe, CommonModule, UserIconComponent, FormsModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() isShow: boolean = false;
  @Input() title: string = '';
  @Output() show = new EventEmitter<void>();
  @Output() search = new EventEmitter<string>();

  searchQuery: string = '';

  constructor(private navigationService: NavigationService) {}

  displayMenu(e: Event) {
    e.stopPropagation();
    this.show.emit();
  }

  goToUserInfo() {
    this.navigationService.toRoute('user');
  }

  handleSearch(): void {
    this.navigationService.toRoute(
      'search',
      '',
      { name: this.searchQuery },
      false
    );
  }
}
