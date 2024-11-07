import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {
  ChartType,
  GoogleChartComponent,
  GoogleChartsModule,
} from 'angular-google-charts';

@Component({
  standalone: true,
  imports: [GoogleChartsModule],
  selector: 'sman-enrollment-stats-chart',
  templateUrl: 'enrollment-stats.component.html',
})
export class EnrollmentStatsComponent implements OnInit, OnChanges {
  @Input() width: number = 0;
  @Input() height: number = 0;
  @Input() enrollmentStats: any[] = [];

  public chartData: any[] = [];
  public chartOptions: any;
  public chartType: ChartType;
  public chartColumns: string[];

  constructor() {
    this.chartType = ChartType.LineChart;
    this.chartColumns = ['Year', 'Enrollments'];
  }

  ngOnChanges() {
    this.chartData = this.enrollmentStats;
    this.chartOptions = {
      width: this.width,
      height: this.height,
      curveType: 'function',
      legend: { position: 'bottom' },
    };
  }

  ngOnInit() {}
}
