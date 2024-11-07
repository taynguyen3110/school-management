import { Component, Input, OnInit } from '@angular/core';

@Component({
    standalone: true,
    imports: [],
    selector: 'sman-profile-photo',
    templateUrl: 'profile-photo.component.html'
})

export class ProfilePhotoComponent implements OnInit {
    @Input() photoSrc: string = '';

    constructor() { }

    ngOnInit() { }
}