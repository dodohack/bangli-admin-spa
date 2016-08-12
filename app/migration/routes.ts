import { Routes } from '@angular/router';

import { AuthGuard }     from '../auth';
import { MigrationPage } from '.';

export const migrationRoutes: Routes = [
    {path: 'migration', component: MigrationPage, canActivate: [AuthGuard]}
];


