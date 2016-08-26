import { Routes, RouterModule } from '@angular/router';

import { BaseGuard }         from './auth';

import { galleryRoutes }   from './gallery/routes';
import { emailRoutes }     from './email/routes';

const appRoutes: Routes = [
    ...galleryRoutes,

    /*
    { path: 'affiliate',  component: AffiliatePage },
    { path: 'analysis',   component: AnalysisPage },
    { path: 'comment', component: },
    { path: 'cs', component: },
    */
    ...emailRoutes,
];

export const routing = RouterModule.forRoot(appRoutes);
