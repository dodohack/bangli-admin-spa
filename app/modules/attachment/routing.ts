import { Routes, RouterModule } from '@angular/router';

import { BaseGuard }     from '../../guard';
import { GalleryPage }   from './gallery.page';

export const routes: Routes = [
    { path: 'attachment', component: GalleryPage, canActivate: [BaseGuard] }
];

export const routing = RouterModule.forChild(routes);
