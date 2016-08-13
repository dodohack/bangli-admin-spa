import { Routes } from '@angular/router';

import { SuperUserGuard }  from '../auth';
import { MigrationPage }   from '.';

export const migrationRoutes: Routes = [
    {path: 'migration', component: MigrationPage, canActivate: [SuperUserGuard]}
];
