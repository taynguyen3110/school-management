import { Component, Inject, inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserProfile } from '../shared/types';
import { AuthApiService } from '../shared/services/authApi.service';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { NotificationService } from '../shared/services/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HeadingComponent } from '../shared/components/heading/heading.component';
import { ButtonComponent } from '../shared/components/button/button.component';
import { InputComponent } from '../shared/components/input/input.component';
import { FormService } from '../shared/services/form.service';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HeadingComponent,
    ButtonComponent,
    InputComponent,
  ],
  selector: 'sman-edit-profile',
  templateUrl: 'edit-profile.component.html',
})
export class EditProfileComponent {
  @Input() setUser!: (user: UserProfile) => void;

  isLoading: boolean = false;
  formIsChanged: boolean = false;
  private unsubscribe$ = new Subject<void>();
  dialogRef = inject(MatDialogRef<EditProfileComponent>);

  constructor(
    private authApi: AuthApiService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA)
    private user: UserProfile | undefined,
    public formService: FormService
  ) {}

  ngOnInit() {
    if (this.user) {
      this.setFormData(
        this.user.firstName,
        this.user.lastName,
        this.user.email
      );
    }

    this.userProfileForm.valueChanges.subscribe(() => {
      if (
        this.firstName.value === this.user?.firstName &&
        this.lastName.value === this.user?.lastName &&
        this.email.value === this.user?.email
      ) {
        this.formIsChanged = false;
      } else {
        this.formIsChanged = true;
      }
    });
  }

  userProfileForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  // change profile form
  get firstName() {
    return this.userProfileForm.get('firstName') as FormControl;
  }

  get lastName() {
    return this.userProfileForm.get('lastName') as FormControl;
  }

  get email() {
    return this.userProfileForm.get('email') as FormControl;
  }

  setFormData(firstName: string, lastName: string, email: string) {
    this.userProfileForm.patchValue({
      firstName: firstName,
      lastName: lastName,
      email: email,
    });
  }

  cancelEdit() {
    this.dialogRef.close();
  }

  updateUser() {
    if (this.user) {
      const newUser = {
        ...this.user,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value,
      };
      this.authApi
        .updateAccount(newUser)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((newU) => {
          this.setUser(newU);
          this.notificationService.notify('Profile updated successfully');
          this.cancelEdit();
        });
    }
  }
}
