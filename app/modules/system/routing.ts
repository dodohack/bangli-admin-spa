import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from '../../guard';

import { SettingPage }   from './setting.page';
import { LocationsPage } from './locations.page';

const routes: Routes = [
    {
        /**
         * System setting path
         */
        path: 'system',
        canActivate: [AdminGuard],
        children: [
            /* Index */
            { path: '', component: SettingPage },
            /* Locations management */
            { path: 'location', component: LocationsPage },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
