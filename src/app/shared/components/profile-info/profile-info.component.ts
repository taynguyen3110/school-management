import { Component, Input, OnInit } from '@angular/core';

@Component({
    standalone: true,
    imports: [],
    selector: 'sman-profile-info',
    templateUrl: 'profile-info.component.html'
})

export class ProfileInfoComponent implements OnInit {
    @Input() label: string = '';

    constructor() { }

    ngOnInit() { }
}