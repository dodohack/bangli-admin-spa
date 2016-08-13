import { Routes } from '@angular/router';

import { BaseGuard }     from '../auth';
import { DashboardPage } from '.';

export const dashboardRoutes: Routes = [
    {
        path: '',
        canActivate: [BaseGuard],
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
            {path: 'dashboard', component: DashboardPage}
        ]
    }
];