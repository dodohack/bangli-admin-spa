import { Routes } from '@angular/router';

import { AuthGuard }     from '../auth/guard';
import { DashboardPage } from '.';

export const dashboardRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
            {path: 'dashboard', component: DashboardPage}
        ]
    }
];