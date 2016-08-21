import { Routes, RouterModule } from '@angular/router';

import { BaseGuard }         from './auth';


import { VouchersPage }      from './shop/vouchers';
import { VoucherPage }       from './shop/voucher';
import { ProductCategoriesPage } from './system/product-categories';

import { dashboardRoutes } from './dashboard/routes';
import { shopRoutes }      from './shop/routes';
import { cmsRoutes }       from './cms/routes';
import { galleryRoutes }   from './gallery/routes';
import { emailRoutes }     from './email/routes';
import { migrationRoutes } from './migration/routes';

const appRoutes: Routes = [

    ...dashboardRoutes,
    ...shopRoutes,
    ...galleryRoutes,

    {path: 'categories/product', component: ProductCategoriesPage, canActivate: [BaseGuard]},
 

    {
        path: 'vouchers',
        canActivate: [BaseGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'all/all/1' },
            { path: ':filter/:cond', redirectTo: ':filter/:cond/1' },
            { path: ':filter/:cond/:page', component: VouchersPage }
        ]
    },

    {
        path: 'voucher',
        canActivate: [BaseGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'new' },
            { path: ':id', component: VoucherPage }
        ]
    },


    /*
    { path: 'affiliate',  component: AffiliatePage },
    { path: 'analysis',   component: AnalysisPage },
    { path: 'comment', component: },
    { path: 'cs', component: },
    */
    ...emailRoutes,
    ...cmsRoutes,
    
    ...migrationRoutes
];

export const routing = RouterModule.forRoot(appRoutes);
