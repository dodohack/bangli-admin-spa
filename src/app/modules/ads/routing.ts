import { Routes, RouterModule } from '@angular/router';

import { AdsPage } from './ads.page';

const routes: Routes = [
    {
        path: 'ads',
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'page/1/state/all'},
            { path: 'page/:page',          redirectTo: 'page/:page/state/all' },
            { path: 'page/:page/state/:state', component: AdsPage },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
