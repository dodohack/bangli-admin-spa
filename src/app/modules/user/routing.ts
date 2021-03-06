import { Routes, RouterModule } from '@angular/router';

import { AdminGuard }   from '../../guard';
import { UsersPage }    from './users.page';
import { UserPage }     from './user.page';

const routes: Routes = [
    {
        path: 'user',
        children: [
            { path: '',      pathMatch: 'full', redirectTo: 'page/1/role/0' },
            { path: 'page/:page',               redirectTo: 'page/:page/role/0' },
            { path: 'page/:page/role/:role',   component: UsersPage, canActivate: [ AdminGuard ] },
            { path: 'page/:page/status/:role',  component: UsersPage, canActivate: [ AdminGuard ] },

            /* Single user */
            { path: 'new',   component: UserPage, canActivate: [ AdminGuard ] },
            { path: ':uuid', component: UserPage }
        ]
    }
];

export const routing = RouterModule.forChild(routes);
