import { Routes, RouterModule } from '@angular/router';

import { BaseGuard }     from '../../guard';
import { GalleriesPage }   from './galleries.page';

export const routes: Routes = [
    {
        path: 'attachment',
        canActivate: [BaseGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'page/1' },
            { path: 'page/:page',           component: GalleriesPage }
        ]
    }
];

export const routing = RouterModule.forChild(routes);
