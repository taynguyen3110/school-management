import { ScreenService } from '@/app/shared/services/screen.service';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import {
  ChartType,
  GoogleChartComponent,
  GoogleChartsModule,
} from 'angular-google-charts';
import { Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  imports: [GoogleChartsModule],
  selector: 'sman-enrollment-stats-chart',
  templateUrl: 'enrollment-stats.component.html',
})
export class EnrollmentStatsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() enrollmentStats: any[] = [];
  isScreenLg: boolean = false;
  isScreenXl: boolean = false;
  isScreenXxl: boolean = false;
  unsubscribe$ = new Subject<void>();
  width: number = 0;
  height: number = 0;
  public chartData: any[] = [];
  public chartOptions: any;
  public chartType: ChartType;
  public chartColumns: string[];

  constructor(private screenService: ScreenService) {
    this.chartType = ChartType.LineChart;
    this.chartColumns = ['Year', 'Enrollments'];
  }

  ngOnChanges() {
    this.updateChart();
  }

  ngOnInit() {
    this.screenService
      .observeScreen('lg')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        this.isScreenLg = result;
        this.updateChart();
      });
    this.screenService
      .observeScreen('xl')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        this.isScreenXl = result;
        this.updateChart();
      });
    this.screenService
      .observeScreen('xxl')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        this.isScreenXxl = result;
        this.updateChart();
      });
  }

  updateChart() {
    this.resizeChart();
    this.initChart();
    this.redrawChart();
  }

  initChart() {
    this.chartData = this.enrollmentStats;
    this.chartOptions = {
      backgroundColor: 'transparent',
      width: this.width,
      height: this.height,
      curveType: 'function',
      legend: { position: 'bottom' },
      animation: {
        startup: true,
        duration: 600,
        easing: 'out',
      },
    };
  }

  resizeChart() {
    this.width = this.isScreenXxl
      ? 1000
      : this.isScreenXl
      ? 600
      : this.isScreenLg
      ? 420
      : 325;
    this.height = this.isScreenLg ? 322 : 300;
  }

  redrawChart() {
    this.chartOptions = { ...this.chartOptions };
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
