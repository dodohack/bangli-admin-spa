import { Routes, RouterModule } from '@angular/router';

import { SuperUserGuard }  from '../../guard';
import { MigrationPage }   from './migration';

export const routes: Routes = [
    {path: 'migration', component: MigrationPage, canActivate: [SuperUserGuard]}
];

export const routing = RouterModule.forChild(routes);
