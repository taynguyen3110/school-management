import {
  Component,
  EventEmitter,
  inject,
  Inject,
  Input,
  Output,
} from '@angular/core';
import {
  Validators,
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { passwordValidator } from '../shared/validators/passwordValidator';
import { passwordMismatchValidator } from '../shared/validators/passwordMismatchValidator';
import { HeadingComponent } from '../shared/components/heading/heading.component';
import { ButtonComponent } from '../shared/components/button/button.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HeadingComponent,
        ButtonComponent,
    ],
    selector: 'sman-change-password',
    templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent {
  @Output() changePwd = new EventEmitter<string>();

  isLoading: boolean = false;

  readonly dialogRef = inject(MatDialogRef<ChangePasswordComponent>);
  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  changePwdForm = this.fb.group(
    {
      newPwd: [
        '',
        [Validators.required, Validators.minLength(8), passwordValidator()],
      ],
      confirmNewPwd: [
        '',
        [Validators.required, Validators.minLength(8), passwordValidator()],
      ],
    },
    {
      validators: passwordMismatchValidator('newPwd', 'confirmNewPwd'),
    }
  );

  // change pwd form
  get newPwd() {
    return this.changePwdForm.get('newPwd') as FormControl;
  }

  get confirmNewPwd() {
    return this.changePwdForm.get('confirmNewPwd') as FormControl;
  }

  cancelChangePassword() {
    this.dialogRef.close();
  }

  changePassword() {
    this.changePwd.emit(this.newPwd.value);
  }
}
