import { animation } from '@angular/animations';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  ChartType,
  GoogleChartComponent,
  GoogleChartsModule,
} from 'angular-google-charts';

@Component({
  standalone: true,
  imports: [GoogleChartsModule],
  selector: 'sman-gender-ratio-chart',
  templateUrl: 'gender-ratio.component.html',
})
export class GenderRatioComponent implements OnInit, OnChanges {
  @Input() width: number = 0;
  @Input() height: number = 0;
  @Input() maleCount: number = 0;
  @Input() femaleCount: number = 0;

  public chartData: any[] = [];
  public chartOptions: any;
  public chartType: ChartType;
  public chartColumns: string[];

  constructor() {
    this.chartType = ChartType.PieChart;
    this.chartColumns = ['Gender', 'Count'];
  }

  ngOnChanges(): void {
    this.chartData = [
      ['Male', this.maleCount],
      ['Female', this.femaleCount],
    ];
    this.chartOptions = {
      backgroundColor: 'transparent',
      pieHole: 0.7,
      pieSliceTextStyle: {
        color: '',
      },
      slices: {
        0: { color: '#4C78FF' },
        1: { color: '#FFBB38' },
      },
      legend: 'none',
      width: this.width,
      height: this.height,
      animation: {
        startup: true,
        duration: 1000,  
        easing: 'out'  
      }
    };
  }
  ngOnInit() {}
}
