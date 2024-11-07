import { TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [TitleCasePipe],
  selector: 'sman-page-layout',
  templateUrl: 'page-layout.component.html',
})
export class PageLayoutComponent implements OnInit {
  @Input() title: string = '';

  constructor() {}

  ngOnInit() {}
}
