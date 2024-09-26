import { Routes } from '@angular/router';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { StudentsComponent } from './students/students.component';
import { TeachersComponent } from './teachers/teachers.component';
import { ParentsComponent } from './parents/parents.component';

export const routes: Routes = [
    {
        path: '',
        title: 'Dashboard',
        component: DashboardComponent
    },
    {
        path: 'students',
        title: 'Students',
        component: StudentsComponent
    },
    {
        path: 'teachers',
        title: 'Teachers',
        component: TeachersComponent
    },
    {
        path: 'parents',
        title: 'Parents',
        component: ParentsComponent
    },
    // {
    //     path: '**',
    //     title: 'Dashboard',
    //     component: DashboardComponent
    // }
];
