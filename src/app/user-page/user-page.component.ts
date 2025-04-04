import { Component, inject } from '@angular/core';
import { AuthApiService } from '../shared/services/authApi.service';
import { UserProfile } from '../shared/types';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password.component';
import { EditProfileComponent } from './edit-profile.component';
import { Subject, takeUntil } from 'rxjs';
import { NotificationService } from '../shared/services/notification.service';
import { ButtonComponent } from '../shared/components/button/button.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../shared/services/auth.service';
import { LoadingSpinnerComponent } from '../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'sman-user-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './user-page.component.html',
})
export class UserPageComponent {
  user?: UserProfile;
  isLoading: boolean = true;

  unsubscribe$ = new Subject<void>();

  readonly dialog = inject(MatDialog);

  constructor(
    private authApi: AuthApiService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.authApi
      .getAccount()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (userInfo) => {
          this.setUser(userInfo);
          this.isLoading = false;
        },
        error: (error) => {
          this.notificationService.notify('Error getting account information!');
          this.isLoading = false;
        }
      });
  }

  setUser = (user: UserProfile) => {
    this.user = user;
  };

  openEditProfileDialog() {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      maxWidth: '500px',
      width: '80vw',
      disableClose: true,
      data: {
        ...this.user,
      },
    });
    dialogRef.afterClosed().subscribe((user) => {
      if (user) this.user = user;
    });
  }

  openEditPasswordDialog() {
    this.dialog.open(ChangePasswordComponent, {
      maxWidth: '500px',
      width: '80vw',
      disableClose: true,
      data: {
        ...this.user,
      },
    });
  }

  onChangePassword(password: string) {
    this.authApi.changePassword(password).subscribe(() => {
      this.notificationService.notify('Password changed successfully');
    });
  }

  onLogOut() {
    this.authService.logOut();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
