import { Component, Input, OnInit } from '@angular/core';
import { Notice } from '../dashboard-page.component';
import { DatePipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [DatePipe],
  selector: 'sman-notice-news',
  templateUrl: 'notice-news.component.html',
})
export class NoticeNewsComponent implements OnInit {
  @Input() notice!: Notice;

  constructor() {}

  ngOnInit() {}
}
