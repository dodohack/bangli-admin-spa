import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from '../../guard';
import { EditorGuard } from '../../guard';

import { SettingPage }   from './setting.page';
import { LocationsPage } from './locations.page';
import { FeMenuPage }    from './femenu.page';
import { CmsPage }       from './cms.page';
import { BbsPage }       from './bbs.page';
import { ThumbPage }     from './thumb.page';
import { OfferFilterPage } from './offer.filter.page';

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

            /* Frontend menu setting */
            { path: 'menu', component: FeMenuPage, canActivate: [AdminGuard] },

            /* Image and thumbnail */
            { path: 'thumb', component: ThumbPage, canActivate: [AdminGuard] },

            /* Offer filters etc */
            { path: 'offer', component: OfferFilterPage, canActivate: [AdminGuard] },

            /* Cms setting sub-path */
            {
                path: 'cms',
                canActivate: [EditorGuard],
                children: [
                    /* cms setting index */
                    { path: '', pathMatch: 'full', redirectTo: 'shopping/category' },
                    { path: ':channel',            redirectTo: ':channel/category' },
                    { path: ':channel/:taxonomy',  component: CmsPage }
                ]
            },

            /* Bbs setting sub-path */
            {
                path: 'bbs',
                canActivate: [AdminGuard],
                children: [
                    /* bbs setting index */
                    { path: '',                   component: BbsPage },
                    { path: ':channel',           redirectTo: ':channel/category'},
                    { path: ':channel/:taxonomy', component: BbsPage }
                ]
            },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
