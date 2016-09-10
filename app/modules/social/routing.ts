import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from '../../guard';

import { SettingPage }   from './setting.page';

const routes: Routes = [
    {
        /**
         * Social path
         */
        path: 'social',
        canActivate: [AdminGuard],
        children: [
            /* Index */
            { path: '',   pathMatch: 'full', redirectTo: 'setting' },
            { path: 'setting', component: SettingPage },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
