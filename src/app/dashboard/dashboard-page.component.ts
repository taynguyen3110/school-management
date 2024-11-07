import { Component, OnInit } from '@angular/core';
import { GenderRatioComponent } from "./gender-ratio/gender-ratio.component";
import { StatsWrapperComponent } from "./stats-wrapper/stats-wrapper.component";
import { EnrollmentStatsComponent } from "./enrollment-stats/enrollment-stats.component";
import { StatsCellComponent } from "./stats-cell/stats-cell.component";
import { NavigationService, route } from '../shared/services/navigation.service';
import { DashboardService } from './service/dashboard.service';

@Component({
  selector: 'sman-dashboard',
  standalone: true,
  imports: [GenderRatioComponent, StatsWrapperComponent, EnrollmentStatsComponent, StatsCellComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardComponent implements OnInit {
  studentCount: number = 0;
  maleCount: number = 0;
  femaleCount: number = 0;
  parentCount: number = 0;
  teacherCount: number = 0;
  classCount: number = 0;
  enrollmentsPerYear: any[] = [];

  constructor(
    private navigationService: NavigationService,
    private dashboardService: DashboardService
  ) {
  }

  ngOnInit() {
    this.getStats()
  }

  getStats() {
    this.dashboardService.getStatistic()
      .subscribe(data => {
        this.studentCount = data.studentCount
        this.maleCount = data.maleCount
        this.femaleCount = data.femaleCount
        this.parentCount = data.parentCount
        this.teacherCount = data.teacherCount
        this.classCount = data.classCount
        this.enrollmentsPerYear = data.enrollmentsPerYear
      })
  }

  handleClick(url: route) {
    this.navigationService.toRoute(url)
  }

  gcd(a: number, b: number): number {
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  }

  getSimplifiedRatio(): string {
    if (this.teacherCount === 0) {
      return 'N/A';
    }
    
    const divisor = this.gcd(this.studentCount, this.teacherCount);
    const simplifiedStudents = this.studentCount / divisor;
    const simplifiedTeachers = this.teacherCount / divisor;

    return `${simplifiedStudents}:${simplifiedTeachers}`;
  }
}

