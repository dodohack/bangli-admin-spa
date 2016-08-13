import { Routes } from '@angular/router';

import { BaseGuard }     from '../auth';
import { ImagesPage }    from '.';

export const galleryRoutes: Routes = [
    { path: 'gallery', canActivate: [BaseGuard], component: ImagesPage }
];
