import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormService } from '../../shared/services/form.service';
import { CommonModule } from '@angular/common';
import { StudentService } from '../service/student.service';
import { PhotoUploaderComponent } from "../../shared/components/photouploader/photo-uploader.component";
import { Student } from '../../shared/types';

@Component({
  selector: 'sman-add-student',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, PhotoUploaderComponent],
  templateUrl: './student-add.component.html',
})
export class AddStudentComponent {
  @Output() cancel = new EventEmitter()

  constructor(
    private fb: FormBuilder,
    public formService: FormService,
    private studentService: StudentService
  ) { }

  addStudentForm = this.fb.group({
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
    return this.addStudentForm.get('firstName') as FormControl;
  }
  get lastName() {
    return this.addStudentForm.get('lastName') as FormControl;
  }
  get gender() {
    return this.addStudentForm.get('gender') as FormControl;
  }
  get classIds() {
    return this.addStudentForm.get('classIds') as FormControl;
  }
  get parentIds() {
    return this.addStudentForm.get('parentIds') as FormControl;
  }
  get address() {
    return this.addStudentForm.get('address') as FormControl;
  }
  get dateOfBirth() {
    return this.addStudentForm.get('dateOfBirth') as FormControl;
  }
  get phone() {
    return this.addStudentForm.get('phone') as FormControl;
  }
  get email() {
    return this.addStudentForm.get('email') as FormControl;
  }
  get admissionDate() {
    return this.addStudentForm.get('admissionDate') as FormControl;
  }
  get profileUrl() {
    return this.addStudentForm.get('profileUrl') as FormControl;
  }

  choosePhoto(photoUrl: string) {
    this.profileUrl.setValue(photoUrl);
  }

  cancelAddStudent() {
    this.cancel.emit()
  }

  toStudent(data: any): Student {
    return {
      firstName: data.firstName ?? '',
      lastName: data.lastName ?? '',
      address: data.address ?? '',
      phone: data.phone ?? '',
      email: data.email ?? '',
      profileUrl: data.profileUrl ?? '',
      gender: data.gender ?? "male",
      dateOfBirth: data.dateOfBirth ?? '',
      classIds: data.classIds ?? [],
      parentIds: data.parentIds ?? [],
      admissionDate: data.dateOfBirth ?? '',
    };
  }

  addStudent(e: Event) {
    e.preventDefault();
    this.studentService.addStudent(this.toStudent(this.addStudentForm.value)).subscribe(() => {
      this.cancelAddStudent();
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
