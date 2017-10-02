/**
 * Routing for bbs module
 */
import { Routes, RouterModule } from '@angular/router';

import { BbsHome } from './bbs.home';

const routes: Routes = [

    {
        path: 'bbs',
        children: [
            { path: '', component: BbsHome },
        ]
    },
];

export const routing = RouterModule.forChild(routes);
