import { Component, inject, Input, OnInit } from '@angular/core';
import { Validators, ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';
// import { AuthApiService } from '../shared/services/authApi.service';
import { CommonModule } from '@angular/common';
import { passwordValidator } from '../shared/validators/passwordValidator';

@Component({
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    selector: 'sman-change-password',
    templateUrl: './change-password.component.html'
})

export class ChangePasswordComponent {
    @Input() cancelChangePassword!: () => void;

    // private authApi = inject(AuthApiService);
    private fb = inject(FormBuilder);
    isLoading: boolean = false;

    constructor() { }

    ngOnInit() { }

    changePwdForm = this.fb.group({
        newPwd: ['', [
            Validators.minLength(8),
            passwordValidator()
        ]],
        confirmNewPwd: ['', [
            Validators.minLength(8),
            passwordValidator()
        ]]
    })

    // change pwd form
    get newPwd() {
        return this.changePwdForm.get('newPwd') as FormControl;
    }

    get confirmNewPwd() {
        return this.changePwdForm.get('confirmNewPwd') as FormControl;
    }

    changePassword() {

    }
}