import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard-page.component';
import { StudentsComponent } from './students/students-page/students-page.component';
import { TeachersComponent } from './teachers/teachers-page.component';
import { ParentsComponent } from './parents/parents-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { StudentProfileComponent } from './students/student-profile/student-profile.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                title: 'Dashboard',
                component: DashboardComponent
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
        ]
    },

    // {
    //     path: '**',
    //     title: 'Dashboard',
    //     component: DashboardComponent
    // }
];
