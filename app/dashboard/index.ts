import { RouterConfig } from '@angular/router';

import { AuthGuard }     from '../auth/guard';
import { DashboardPage } from './dashboard';

export const dashboardRoutes: RouterConfig = [
    {
        path: '',
        canActivate: [AuthGuard],
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
            {path: 'dashboard', component: DashboardPage}
        ]
    }
];