import { Routes, RouterModule } from '@angular/router';

import { AdminGuard }   from '../../guard';
import { UsersPage }    from './users.page';
import { UserPage }     from './user.page';

import { DomainsPage }  from './domains.page';

const routes: Routes = [
    
    { path: 'domains',  component: DomainsPage },
    
    {
        path: 'user',
        canActivate: [ AdminGuard ],
        children: [
            { path: '',      pathMatch: 'full', redirectTo: 'page/1/role/0' },
            { path: 'page/:page',               redirectTo: 'page/:page/role/0' },
            { path: 'page/:page/role/:role',   component: UsersPage },
            { path: 'page/:page/state/:role',  component: UsersPage },

            /* Single user */
            { path: 'new', component: UserPage },
            { path: ':id', component: UserPage }
        ]
    }
];

export const routing = RouterModule.forChild(routes);