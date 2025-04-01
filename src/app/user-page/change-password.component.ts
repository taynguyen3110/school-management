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
import { MatDialogRef } from '@angular/material/dialog';
import { InputComponent } from '../shared/components/input/input.component';
import { FormService } from '../shared/services/form.service';
import { AddNewFormLayoutComponent } from '../shared/components/addnew-form-layout/addnew-form-layout.component';
import checkFormChange from '../shared/utils/checkFormChanged';
import { AuthApiService } from '../shared/services/authApi.service';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    AddNewFormLayoutComponent,
  ],
  selector: 'sman-change-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent {
  formIsChanged: boolean = false;

  readonly dialogRef = inject(MatDialogRef<ChangePasswordComponent>);
  constructor(
    private fb: FormBuilder,
    public formService: FormService,
    private authApi: AuthApiService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.changePwdForm.valueChanges.subscribe(() => {
      this.formIsChanged = checkFormChange(this.changePwdForm);
    });
  }

  changePwdForm = this.fb.group(
    {
      newPwd: [
        '',
        [Validators.required, Validators.minLength(8), passwordValidator()],
      ],
      confirmNewPwd: ['', [Validators.required]],
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

  changePassword() {
    // this.authApi.changePassword(this.newPwd.value).subscribe(() => {
      this.notificationService.notify('It worked! But I changed it back to the old password for others to use as well.');
      this.dialogRef.close();
    // });
  }
}
