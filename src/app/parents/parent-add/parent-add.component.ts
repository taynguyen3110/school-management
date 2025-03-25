import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PhotoUploaderComponent } from '../../shared/components/photouploader/photo-uploader.component';
import { FormService } from '../../shared/services/form.service';
import { ParentsService } from '../services/parents.service';
import { Parent } from '../../shared/types';
import { InputComponent } from '../../shared/components/input/input.component';
import { NotificationService } from '../../shared/services/notification.service';
import { AddNewFormLayoutComponent } from '../../shared/components/addnew-form-layout/addnew-form-layout.component';
import { MatDialogRef } from '@angular/material/dialog';
import { AddressAutocompleteComponent } from '@/app/shared/components/address-autocomplete/address-autocomplete.component';
import { environment } from '@/environments/environment';

@Component({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        PhotoUploaderComponent,
        InputComponent,
        AddNewFormLayoutComponent,
        AddressAutocompleteComponent
    ],
    selector: 'sman-add-parent',
    templateUrl: 'parent-add.component.html'
})
export class AddParentComponent implements OnInit {
  @Input() parent!: Parent;

  isDirty: boolean = false;

  readonly dialogRef = inject(MatDialogRef<AddParentComponent>);
  private readonly apiUrl = environment.apiUrl;
  constructor(
    private fb: FormBuilder,
    public formService: FormService,
    private parentService: ParentsService,
    private notificationService: NotificationService
  ) {}

  addParentForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    address: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required]],
    profileUrl: [
      `${this.apiUrl}/photos/profile-picture.jpg`,
      [Validators.required],
    ],
  });

  get firstName() {
    return this.addParentForm.get('firstName') as FormControl;
  }
  get lastName() {
    return this.addParentForm.get('lastName') as FormControl;
  }
  get address() {
    return this.addParentForm.get('address') as FormControl;
  }
  get phone() {
    return this.addParentForm.get('phone') as FormControl;
  }
  get email() {
    return this.addParentForm.get('email') as FormControl;
  }
  get profileUrl() {
    return this.addParentForm.get('profileUrl') as FormControl;
  }

  ngOnInit() {
    this.addParentForm.valueChanges.subscribe(() => {
      this.isDirty = this.addParentForm.dirty;
    });
  }

  choosePhoto(photoUrl: string) {
    this.profileUrl.setValue(photoUrl);
  }

  addParent(e: Event) {
    e.preventDefault();
    // this.parentService
    //   .addParent(this.addParentForm.value as Parent)
    //   .subscribe(() => {
    //     this.isDirty = false;
    //     this.dialogRef.close();
    //     this.notificationService.notify('Parent added successfully!');
    //   });
    console.log(this.addParentForm.value);
    
  }
}
