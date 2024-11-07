import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard-page.component';
import { StudentsComponent } from './students/student-page/students-page.component';
import { TeachersComponent } from './teachers/teachers-page.component';
import { ParentsComponent } from './parents/parents-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { StudentProfileComponent } from './students/student-profile/student-profile.component';
import { ParentProfileComponent } from './parents/parent-profile/parent-profile.component';
import { TeacherProfileComponent } from './teachers/teacher-profile/teacher-profile.component';
import { SubjectsComponent } from './subjects/subject-page.component';
import { SubjectDetailComponent } from './subjects/subject-detail/subject-detail.component';
import { ClassesComponent } from './school-classes/classes-page.component';
import { ClassDetailComponent } from './school-classes/classes-detail/classes-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        title: 'Dashboard',
        component: DashboardComponent,
      },
      {
        path: 'students',
        title: 'Students',
        component: StudentsComponent,
      },
      {
        path: 'students/:id',
        component: StudentProfileComponent,
      },
      {
        path: 'teachers',
        title: 'Teachers',
        component: TeachersComponent,
      },
      {
        path: 'teachers/:id',
        component: TeacherProfileComponent,
      },
      {
        path: 'parents',
        title: 'Parents',
        component: ParentsComponent,
      },
      {
        path: 'parents/:id',
        component: ParentProfileComponent,
      },
      {
        path: 'subjects',
        title: 'Subjects',
        component: SubjectsComponent,
      },
      {
        path: 'subjects/:id',
        component: SubjectDetailComponent,
      },
      {
        path: 'classes',
        title: 'Classes',
        component: ClassesComponent,
      },
      {
        path: 'classes/:id',
        component: ClassDetailComponent,
      },
      {
        path: 'user',
        title: 'User',
        component: UserPageComponent,
      },
    ],
  },

  // {
  //     path: '**',
  //     title: 'Dashboard',
  //     component: DashboardComponent
  // }
];
