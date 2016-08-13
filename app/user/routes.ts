import { Routes } from '@angular/router';

import { AdminGuard }   from '../auth';
import { UsersPage }    from '.';
import { UserPage }     from '.';

export const userRoutes: Routes = [
    {
        path: 'user',
        canActivate: [ AdminGuard ],
        children: [
            /* List of users, '5' id of customer role */
            { path: '', pathMatch: 'full', redirectTo: 'list/5/1' },
            { path: 'list/:role', redirectTo: 'list/:role/1' },
            { path: 'list/:role/:page', component: UsersPage },

            /* Single user */
            { path: 'new', component: UserPage },
            { path: ':uuid', component: UserPage }
        ]
    }
];

