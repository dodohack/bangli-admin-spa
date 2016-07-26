import { RouterConfig } from '@angular/router';

import { AuthGuard }     from '../auth/guard';
import { ImagesPage }    from './images';

export const galleryRoutes: RouterConfig = [
    { path: 'gallery', canActivate: [AuthGuard], component: ImagesPage }
];