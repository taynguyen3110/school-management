import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
// import { CanDeactivateGuard } from './shared/guards/can-deactivate.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        title: 'Dashboard - School Management',
        loadComponent: () =>
          import('./dashboard/dashboard-page.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'students',
        title: 'Students - School Management',
        loadComponent: () =>
          import('./students/student-page/students-page.component').then(
            (m) => m.StudentsComponent
          ),
        // canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'students/:id',
        loadComponent: () =>
          import('./students/student-profile/student-profile.component').then(
            (m) => m.StudentProfileComponent
          ),
      },
      {
        path: 'teachers',
        title: 'Teachers - School Management',
        loadComponent: () =>
          import('./teachers/teachers-page.component').then(
            (m) => m.TeachersComponent
          ),
      },
      {
        path: 'teachers/:id',
        loadComponent: () =>
          import('./teachers/teacher-profile/teacher-profile.component').then(
            (m) => m.TeacherProfileComponent
          ),
      },
      {
        path: 'parents',
        title: 'Parents - School Management',
        loadComponent: () =>
          import('./parents/parents-page.component').then(
            (m) => m.ParentsComponent
          ),
      },
      {
        path: 'parents/:id',
        loadComponent: () =>
          import('./parents/parent-profile/parent-profile.component').then(
            (m) => m.ParentProfileComponent
          ),
      },
      {
        path: 'subjects',
        title: 'Subjects - School Management',
        loadComponent: () =>
          import('./subjects/subject-page.component').then(
            (m) => m.SubjectsComponent
          ),
      },
      {
        path: 'subjects/:id',
        loadComponent: () =>
          import('./subjects/subject-detail/subject-detail.component').then(
            (m) => m.SubjectDetailComponent
          ),
      },
      {
        path: 'classes',
        title: 'Classes - School Management',
        loadComponent: () =>
          import('./school-classes/classes-page.component').then(
            (m) => m.ClassesComponent
          ),
      },
      {
        path: 'classes/:id',
        loadComponent: () =>
          import(
            './school-classes/classes-detail/classes-detail.component'
          ).then((m) => m.ClassDetailComponent),
      },
      {
        path: 'user',
        title: 'User - School Management',
        loadComponent: () =>
          import('./user-page/user-page.component').then(
            (m) => m.UserPageComponent
          ),
      },
      {
        path: 'search',
        title: 'Search Result - School Management',
        loadComponent: () =>
          import('./global-search/global-search.component').then(
            (m) => m.GlobalSearchComponent
          ),
      },
      {
        path: 'components',
        title: 'Component Library - School Management',
        loadComponent: () =>
          import('./shared/components-showcase/components-showcase.component').then(
            (m) => m.ComponentsShowcaseComponent
          ),
      },
      {
        path: '**',
        title: 'Dashboard - School Management',
        loadComponent: () =>
          import('./dashboard/dashboard-page.component').then(
            (m) => m.DashboardComponent
          ),
      },
    ],
  },
];
