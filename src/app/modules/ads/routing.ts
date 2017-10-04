import { Routes, RouterModule } from '@angular/router';

import { AdsPage } from './ads.page';

const routes: Routes = [
    {
        path: 'ads',
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'page/1/status/all'},
            { path: 'page/:page',          redirectTo: 'page/:page/status/all' },
            { path: 'page/:page/status/:status', component: AdsPage },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
