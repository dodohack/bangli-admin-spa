import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from '../../guard';

import { SocialPage }   from './social.page';
import { SettingPage }  from './setting.page';

const routes: Routes = [
    {
        /**
         * Social path
         */
        path: 'social',
        canActivate: [AdminGuard],
        children: [
            /* Index */
            { path: '',        component: SocialPage },
            { path: 'setting', component: SettingPage },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
