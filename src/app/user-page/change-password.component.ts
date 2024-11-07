import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Validators, ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';
// import { AuthApiService } from '../shared/services/authApi.service';
import { CommonModule } from '@angular/common';
import { passwordValidator } from '../shared/validators/passwordValidator';
import { passwordMismatchValidator } from '../shared/validators/passwordMismatchValidator';
import { AuthApiService } from '../shared/services/authApi.service';

@Component({
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    selector: 'sman-change-password',
    templateUrl: './change-password.component.html'
})

export class ChangePasswordComponent {
    @Input() cancelChangePassword!: () => void;

    @Output() changePwd = new EventEmitter<string>()

    isLoading: boolean = false;

    constructor(
        private fb: FormBuilder
    ) { }

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
    }, {
        validators: passwordMismatchValidator('newPwd', 'confirmNewPwd')
    })

    // change pwd form
    get newPwd() {
        return this.changePwdForm.get('newPwd') as FormControl;
    }

    get confirmNewPwd() {
        return this.changePwdForm.get('confirmNewPwd') as FormControl;
    }

    changePassword() {
        this.changePwd.emit(this.newPwd.value)
    }
}