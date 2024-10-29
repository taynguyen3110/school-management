import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../../../students/service/student.service';
import { FormService } from '../../services/form.service';
import { Student } from '../../types';
import { PhotoUploaderComponent } from '../photouploader/photo-uploader.component';
import { toStudent } from './utils/classMapping';

@Component({
  selector: 'sman-add-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, PhotoUploaderComponent],
  templateUrl: './add-form.component.html',
})
export class AddFormComponent {
  @Input() addNew: string = '';
  @Output() cancel = new EventEmitter()

  constructor(
    private fb: FormBuilder,
    public formService: FormService,
    private studentService: StudentService
  ) { }

  addForm = this.fb.group({
    firstName: ['', [
      Validators.required,
    ]],
    lastName: ['', [
      Validators.required,
    ]],
    gender: ['', [
      Validators.required,

    ]],
    classIds: [[], [

    ]],
    parentIds: [[], [
      Validators.required,

    ]],
    address: ['', [
      Validators.required,

    ]],
    dateOfBirth: ['', [
      Validators.required,

    ]],
    phone: ['', [
      Validators.required,

    ]],
    email: ['', [
      Validators.required,

    ]],
    admissionDate: ['', [
      Validators.required,

    ]],
    profileUrl: ['', [
      Validators.required,

    ]],
  })

  get firstName() {
    return this.addForm.get('firstName') as FormControl;
  }
  get lastName() {
    return this.addForm.get('lastName') as FormControl;
  }
  get gender() {
    return this.addForm.get('gender') as FormControl;
  }
  get classIds() {
    return this.addForm.get('classIds') as FormControl;
  }
  get parentIds() {
    return this.addForm.get('parentIds') as FormControl;
  }
  get address() {
    return this.addForm.get('address') as FormControl;
  }
  get dateOfBirth() {
    return this.addForm.get('dateOfBirth') as FormControl;
  }
  get phone() {
    return this.addForm.get('phone') as FormControl;
  }
  get email() {
    return this.addForm.get('email') as FormControl;
  }
  get admissionDate() {
    return this.addForm.get('admissionDate') as FormControl;
  }
  get profileUrl() {
    return this.addForm.get('profileUrl') as FormControl;
  }

  choosePhoto(photoUrl: string) {
    this.profileUrl.setValue(photoUrl);
  }

  cancelForm() {
    this.cancel.emit()
  }

  onAddNew(e: Event) {
    e.preventDefault();
    this.studentService.addStudent(toStudent(this.addForm.value)).subscribe(() => {
      this.cancelForm();
    })
  }


  //   {
  // "profileUrl": "https://example.com/s1",
  // "lastName": "Doe",
  // "firstName": "Jane 2",
  // "gender": "male",
  // "classIds": [
  //     "c1"
  // ],
  // "parentIds": [
  //     "p1",
  //     "p2"
  // ],
  // "address": "123 Main St, Springfield, IL 62701",
  // "dateOfBirth": "2005-01-01",
  // "phone": "217-555-1234",
  // "email": "s1@example.com",
  // "admissionDate": "2010-01-01"
  // }
}
