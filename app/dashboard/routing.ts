import { Routes, RouterModule } from '@angular/router';

import { BaseGuard }     from '../auth';
import { DashboardPage } from './dashboard.page';

const routes: Routes = [
    {path: '',          component: DashboardPage, canActivate: [BaseGuard] },
    {path: 'dashboard', component: DashboardPage, canActivate: [BaseGuard] }
];

export const routing = RouterModule.forChild(routes);
