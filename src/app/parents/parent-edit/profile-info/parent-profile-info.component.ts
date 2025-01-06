import { AddNewFormLayoutComponent } from '@/app/shared/components/addnew-form-layout/addnew-form-layout.component';
import { InputComponent } from '@/app/shared/components/input/input.component';
import { PhotoUploaderComponent } from '@/app/shared/components/photouploader/photo-uploader.component';
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
import { Parent } from '@/app/shared/types';
import { ParentsService } from '../../services/parents.service';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputComponent,
    AddNewFormLayoutComponent,
    PhotoUploaderComponent,
  ],
  selector: 'sman-parent-profile-info',
  templateUrl: 'parent-profile-info.component.html',
})
export class ParentProfileInfoComponent implements OnInit {
  formChanged: boolean = false;

  constructor(
    public formService: FormService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public parent: Parent,
    public dialogRef: MatDialogRef<ParentProfileInfoComponent>,
    private parentService: ParentsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.editParentProfileInfoForm.valueChanges.subscribe(() => {
      this.formChanged = this.checkFormChange();
    });
  }

  editParentProfileInfoForm = this.fb.group({
    firstName: [this.parent.firstName, [Validators.required]],
    lastName: [this.parent.lastName, [Validators.required]],
    profileUrl: [this.parent.profileUrl, [Validators.required]],
  });

  get firstName() {
    return this.editParentProfileInfoForm.get('firstName') as FormControl;
  }
  get lastName() {
    return this.editParentProfileInfoForm.get('lastName') as FormControl;
  }
  get profileUrl() {
    return this.editParentProfileInfoForm.get('profileUrl') as FormControl;
  }

  choosePhoto(photoUrl: string) {
    this.profileUrl.setValue(photoUrl);
  }

  checkFormChange() {
    for (const [key, control] of Object.entries(
      this.editParentProfileInfoForm.controls
    )) {
      if (control?.value !== this.parent[key as keyof Parent]) {
        return true;
      }
    }
    return false;
  }

  edit() {
    this.parentService
      .updateParent(this.parent.id!, {
        ...this.parent,
        ...this.editParentProfileInfoForm.value,
      } as Parent)
      .subscribe(() => {
        this.notificationService.notify('Parent info updated successfully!');
        this.dialogRef.close();
      });
  }

  cancel() {
    console.log(this.editParentProfileInfoForm.value);
    console.log(this.parent);

    // this.dialogRef.close();
  }
}
