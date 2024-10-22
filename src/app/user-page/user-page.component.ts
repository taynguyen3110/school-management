import { Component, inject } from '@angular/core';
import { AuthApiService } from '../shared/services/authApi.service';
import { UserProfile } from '../shared/types';
import { JsonPipe, CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from "./change-password.component";
import { EditProfileComponent } from "./edit-profile.component";
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'sman-user-page',
  standalone: true,
  imports: [CommonModule, JsonPipe, ReactiveFormsModule, ChangePasswordComponent, EditProfileComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent {
  private authApi = inject(AuthApiService);
  user?: UserProfile;
  isEdit: boolean = false;
  isChangePassword: boolean = false;
  isLoading: boolean = false;

  unsubscribe$ = new Subject<void>();

  ngOnInit() {
    this.authApi.getAccount()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(userInfo => {
        this.setUser(userInfo);
      });
  }

  setUser = (user: UserProfile) => {
    this.user = user;
  }

  editMode() {
    this.isEdit = true;
  }

  cancelEdit = () => {
    this.isEdit = false;
  }

  changePasswordMode() {
    this.isChangePassword = true;
  }

  cancelChangePassword = () => {
    this.isChangePassword = false;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
