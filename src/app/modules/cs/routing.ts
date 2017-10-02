import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from '../../guard';

import { CsPage }   from './cs.page';

const routes: Routes = [
    {
        /**
         * Customer service path
         */
        path: 'cs',
        canActivate: [AdminGuard],
        children: [
            /* Index */
            { path: '',   component: CsPage }
        ]
    }
];

export const routing = RouterModule.forChild(routes);
