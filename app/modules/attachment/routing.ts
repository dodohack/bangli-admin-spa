import { Routes, RouterModule } from '@angular/router';

import { BaseGuard }     from '../../guard';
import { GalleryPage }   from './gallery.page';

export const routes: Routes = [
    { path: 'gallery', canActivate: [BaseGuard], component: GalleryPage }
];

export const routing = RouterModule.forChild(routes);
