import { Component, inject } from '@angular/core';
import { AuthApiService } from '../shared/services/authApi.service';
import { UserProfile } from '../shared/types';
import { JsonPipe, CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'sman-user-page',
  standalone: true,
  imports: [CommonModule, JsonPipe, ReactiveFormsModule],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent {
  private authApi = inject(AuthApiService);
  private fb = inject(FormBuilder);
  user?: UserProfile;
  isEdit: boolean = false;
  isChangePassword: boolean = false;
  isLoading: boolean = false;
  formIsChanged: boolean = false;

  userProfileForm = this.fb.group({
    firstName: ['', [
      Validators.required,
    ]],
    lastName: ['', [
      Validators.required,
    ]],
    email: ['', [
      Validators.email
    ]]
  })

  changePwdForm = this.fb.group({
    newPwd: ['', [
      Validators.minLength(8)
    ]],
    confirmNewPwd: ['', [
      Validators.minLength(8)
    ]]
  })

  ngOnInit() {
    this.authApi.getAccount().subscribe(userInfo => {
      this.setUser(userInfo);
      this.setFormData(userInfo.firstName, userInfo.lastName, userInfo.email)
    });

    this.userProfileForm.valueChanges.subscribe(() => {
      if (this.firstName.value === this.user?.firstName && this.lastName.value === this.user?.lastName && this.email.value === this.user?.email) {
        this.formIsChanged = false;
      } else {
        this.formIsChanged = true;
      }
    })
  }

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

  // change pwd form
  get newPwd() {
    return this.changePwdForm.get('newPwd') as FormControl;
  }

  get confirmNewPwd() {
    return this.changePwdForm.get('confirmNewPwd') as FormControl;
  }

  setUser = (user: UserProfile) => {
    this.user = user;
  }

  setFormData(firstName: string, lastName: string, email: string) {
    this.userProfileForm.patchValue({
      firstName: firstName,
      lastName: lastName,
      email: email
    });
  }

  editMode() {
    this.isEdit = true;
  }

  cancelEdit() {
    this.isEdit = false;
    this.setFormData(this.user!.firstName, this.user!.lastName, this.user!.email)
  }

  changePasswordMode() {
    this.isChangePassword = true;
  }

  cancelChangePassword() {
    this.isChangePassword = false;
  }

  updateUser() {
    if (this.user) {
      const newUser = {
        ...this.user,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value
      };
      this.authApi.updateAccount(newUser).subscribe((newU) => {
        this.setUser(newU);
        this.isEdit = false;
      });
    }
  }

  changePassword() {
    console.log('change pwd');
  }
}
