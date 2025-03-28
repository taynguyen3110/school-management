import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { GenderRatioComponent } from './gender-ratio/gender-ratio.component';
import { StatsWrapperComponent } from './stats-wrapper/stats-wrapper.component';
import { EnrollmentStatsComponent } from './enrollment-stats/enrollment-stats.component';
import { StatsCellComponent } from './stats-cell/stats-cell.component';
import { NavigationService } from '../shared/services/navigation.service';
import { DashboardService } from './service/dashboard.service';
import { NoticeNewsComponent } from './notice-news/notice-news.component';
import { ScreenService } from '../shared/services/screen.service';
import {
  BehaviorSubject,
  distinctUntilChanged,
  Subject,
  takeUntil,
  forkJoin,
} from 'rxjs';
import { HeadingComponent } from '../shared/components/heading/heading.component';
import { route, SchoolSubject } from '../shared/types';
import { SubjectService } from '../subjects/services/subject.service';
import { ItemTableComponent } from '../shared/components/item-table/item-table.component';
import { environment } from '@/environments/environment';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'sman-dashboard',
    imports: [
        GenderRatioComponent,
        StatsWrapperComponent,
        EnrollmentStatsComponent,
        StatsCellComponent,
        NoticeNewsComponent,
        HeadingComponent,
        ItemTableComponent,
        MatProgressSpinnerModule,
    ],
    templateUrl: './dashboard-page.component.html',
    styleUrl: './dashboard-page.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  studentCount: number = 0;
  maleCount: number = 0;
  femaleCount: number = 0;
  parentCount: number = 0;
  teacherCount: number = 0;
  classCount: number = 0;
  enrollmentsPerYear: any[] = [];
  todaySubjects: SchoolSubject[] = [];

  isLoading: boolean = true;
  isLoadingStats: boolean = true;
  isLoadingSchedule: boolean = true;

  private readonly apiUrl = environment.apiUrl;

  notices: Notice[] = [
    {
      title: 'School annual sports day celebration 2024',
      date: '2024-01-07',
      image: `${this.apiUrl}/photos/student(3).jpg`,
      views: 105,
    },
    {
      title: 'Annual function celebration 2024',
      date: '2024-08-04',
      image: `${this.apiUrl}/photos/student(4).jpg`,
      views: 289,
    },
    {
      title: 'Mid term exam routine published',
      date: '2024-06-30',
      image: `${this.apiUrl}/photos/student(5).jpg`,
      views: 531,
    },
    {
      title: 'Annual painting competition 2024',
      date: '2024-01-01',
      image: `${this.apiUrl}/photos/student(6).jpg`,
      views: 89,
    },
    {
      title: 'Culture day celebration',
      date: '2024-10-15',
      image: `${this.apiUrl}/photos/student(7).jpg`,
      views: 25,
    },
    {
      title: 'Sports day celebration 2023',
      date: '2023-10-24',
      image: `${this.apiUrl}/photos/student(3).jpg`,
      views: 151,
    },
  ];

  private unsubscribe$ = new Subject<void>();

  constructor(
    private navigationService: NavigationService,
    private dashboardService: DashboardService,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.isLoading = true;
    
    // Load statistics and today's schedule in parallel
    forkJoin({
      stats: this.dashboardService.getStatistic(),
      schedule: this.subjectService.getSubjects({ schedule: this.getDayOfWeek() })
    })
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: ({ stats, schedule }) => {
        this.studentCount = stats.studentCount;
        this.maleCount = stats.maleCount;
        this.femaleCount = stats.femaleCount;
        this.parentCount = stats.parentCount;
        this.teacherCount = stats.teacherCount;
        this.classCount = stats.classCount;
        this.enrollmentsPerYear = stats.enrollmentsPerYear;
        this.todaySubjects = schedule.subjects;
        
        this.isLoadingStats = false;
        this.isLoadingSchedule = false;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.isLoading = false;
        this.isLoadingStats = false;
        this.isLoadingSchedule = false;
      }
    });
  }

  getDayOfWeek(): string {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const today = new Date().getDay();
    return daysOfWeek[today];
  }

  handleClick(url: route) {
    this.navigationService.toRoute(url);
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

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

export interface Notice {
  title: string;
  date: string;
  image: string;
  views: number;
}
