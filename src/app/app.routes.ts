import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard-page.component';
import { StudentsComponent } from './students/students-page.component';
import { TeachersComponent } from './teachers/teachers-page.component';
import { ParentsComponent } from './parents/parents-page.component';
import { UserPageComponent } from './user-page/user-page.component';

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
    {
        path: 'user',
        title: 'User',
        component: UserPageComponent
    },
    // {
    //     path: '**',
    //     title: 'Dashboard',
    //     component: DashboardComponent
    // }
];
