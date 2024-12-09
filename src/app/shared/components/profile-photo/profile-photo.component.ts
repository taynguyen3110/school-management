import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    imports: [CommonModule],
    selector: 'sman-profile-photo',
    templateUrl: 'profile-photo.component.html'
})
export class ProfilePhotoComponent implements OnInit {
  @Input() photoSrc: string = '';
  @Input() size: number = 40;

  constructor() {}

  ngOnInit() {}
}
