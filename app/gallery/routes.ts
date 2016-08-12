import { Routes } from '@angular/router';

import { AuthGuard }     from '../auth';
import { ImagesPage }    from '.';

export const galleryRoutes: Routes = [
    { path: 'gallery', canActivate: [AuthGuard], component: ImagesPage }
];