import { AddNewFormLayoutComponent } from '@/app/shared/components/addnew-form-layout/addnew-form-layout.component';
import { InputComponent } from '@/app/shared/components/input/input.component';
import { FormService } from '@/app/shared/services/form.service';
import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '@/app/shared/services/notification.service';
import { ParentsService } from '../../services/parents.service';
import { Parent } from '@/app/shared/types';
import checkFormChange from '@/app/shared/utils/checkFormChanged';
import { AddressAutocompleteComponent } from "../../../shared/components/address-autocomplete/address-autocomplete.component";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    AddNewFormLayoutComponent,
    ReactiveFormsModule,
    AddressAutocompleteComponent
],
  selector: 'sman-parent-personal-info',
  templateUrl: 'parent-personal-info.component.html',
})
export class ParentPersonalInfoComponent implements OnInit {
  formChanged: boolean = false;

  constructor(
    public formService: FormService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private parent: Parent,
    public dialogRef: MatDialogRef<ParentPersonalInfoComponent>,
    private parentService: ParentsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.editParentPersonalInfoForm.valueChanges.subscribe(() => {
      this.formChanged = checkFormChange(
        this.editParentPersonalInfoForm,
        this.parent
      );
    });
  }

  editParentPersonalInfoForm = this.fb.group({
    address: [this.parent.address, [Validators.required]],
    phone: [this.parent.phone, [Validators.required]],
    email: [this.parent.email, [Validators.required]],
  });

  get address() {
    return this.editParentPersonalInfoForm.get('address') as FormControl;
  }
  get phone() {
    return this.editParentPersonalInfoForm.get('phone') as FormControl;
  }
  get email() {
    return this.editParentPersonalInfoForm.get('email') as FormControl;
  }

  edit() {
    this.parentService
      .updateParent(this.parent.id!, {
        ...this.parent,
        ...this.editParentPersonalInfoForm.value,
      } as Parent)
      .subscribe(() => {
        this.notificationService.notify('Parent info updated successfully!');
        this.dialogRef.close();
      });
  }
}
