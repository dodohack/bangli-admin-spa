import { RouterConfig } from '@angular/router';

import { AuthGuard }    from '../auth/guard';
import { UsersPage }    from './users';
import { UserPage }     from './user';

export const userRoutes: RouterConfig = [
    {
        path: 'user',
        canActivate: [AuthGuard],
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

