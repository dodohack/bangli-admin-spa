import { RouterConfig } from '@angular/router';

import { AuthGuard }     from '../auth/guard';
import { MigrationPage } from './migration';

export const migrationRoutes: RouterConfig = [
    {path: 'migration', component: MigrationPage, canActivate: [AuthGuard]}
];


