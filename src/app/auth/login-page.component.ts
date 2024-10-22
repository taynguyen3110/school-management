import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from '../shared/services/authApi.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../shared/services/auth.service';
import { FormService } from '../shared/services/form.service';
import { ErrorService } from '../shared/services/error.service';
import { passwordValidator } from '../shared/validators/passwordValidator';

@Component({
  selector: 'sman-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatProgressSpinnerModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginComponent {

  // private formBuilder = inject(FormBuilder);
  // private authService = inject(AuthService);

  loginForm = this.formBuilder.group({
    username: ['', [
      Validators.required,
      Validators.minLength(4)
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      passwordValidator()
    ]]
  })
  errMsg: string = '';
  isLoading: boolean = false;
  /**
   * u1@example.com
   * password01
   */
  constructor(
    private authApi: AuthApiService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public formService: FormService,
    private errorService: ErrorService
  ) {
  }

  ngOnInit() {
    this.username.valueChanges.subscribe(() => {
      this.errMsg = '';
    });
    this.password.valueChanges.subscribe(() => {
      this.errMsg = '';
    });
  }

  setErrMsg = (err: string) => {
    this.errMsg = err;
  }

  get username() {
    return this.loginForm.get('username') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  handleLogin(e: Event) {
    e.preventDefault();
    this.isLoading = true;
    this.authApi.login(this.username.value, this.password.value).subscribe({
      next: (x) => {
        this.isLoading = false;
        this.authService.setAuthState(x);
      },
      error: (err) => {
        this.isLoading = false;
        this.errMsg = this.errorService.getErrorMessage(err);
      }
    })
  }
}
