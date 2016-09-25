import { Routes, RouterModule } from '@angular/router';

import { BaseGuard }     from '../../guard';
import { GalleriesPage }   from './galleries.page';

export const routes: Routes = [
    { path: 'attachment', component: GalleriesPage, canActivate: [BaseGuard] }
];

export const routing = RouterModule.forChild(routes);
