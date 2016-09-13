import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from '../../guard';
import { EditorGuard } from '../../guard';

import { SettingPage }   from './setting.page';
import { LocationsPage } from './locations.page';
import { CmsPage }       from './cms.page';
import { ShopPage }      from './shop.page';
import { BbsPage }       from './bbs.page';

const routes: Routes = [
    {
        /**
         * System setting path
         */
        path: 'setting',
        children: [
            /* Index */
            { path: '', component: SettingPage },
            /* Locations management */
            { path: 'location', component: LocationsPage, canActivate: [AdminGuard] },

            /* Cms setting sub-path */
            {
                path: 'cms',
                canActivate: [EditorGuard],
                children: [
                    /* cms setting index */
                    { path: '', pathMatch: 'full', redirectTo: 'category/shopping' },
                    { path: ':taxonomy',          redirectTo: ':taxonomy/shopping' },
                    { path: ':taxonomy/:channel', component: CmsPage }
                ]
            },


            /* Shop setting sub-path */
            {
                path: 'shop',
                canActivate: [EditorGuard],
                children: [
                    /* cms setting index */
                    { path: '', pathMatch: 'full', redirectTo: 'category' },
                    { path: ':taxonomy',           component: ShopPage }
                ]
            },

            /* Bbs setting sub-path */
            {
                path: 'bbs',
                canActivate: [AdminGuard],
                children: [
                    /* bbs setting index */
                    { path: '',                   component: BbsPage },
                    { path: ':taxonomy',          redirectTo: ':taxonomy/shopping'},
                    { path: ':taxonomy/:channel', component: BbsPage }
                ]
            },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
