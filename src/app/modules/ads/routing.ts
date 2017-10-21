/**
 * Advertisement routing
 */
import { Routes, RouterModule } from '@angular/router';

import { EditorGuard, LockGuard }          from '../../guard';

import { AdsPage } from './ads.page';
import { AdPage }  from './ad.page';

const routes: Routes = [
    {
        path: 'advertise',
        children: [
            /* List of advertises */
            { path: '', pathMatch: 'full', redirectTo: 'page/1/status/all'},
            { path: 'page/:page',          redirectTo: 'page/:page/status/all' },
            { path: 'page/:page/status/:status', component: AdsPage, canActivate: [EditorGuard] },

            /* Single advertise */
            { path: 'new', component: AdPage,  canActivate: [EditorGuard] },
            { path: ':id', component: AdPage,  canActivate: [EditorGuard] }
        ]
    }
];

export const routing = RouterModule.forChild(routes);
