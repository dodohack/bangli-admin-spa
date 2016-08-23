import { Routes, RouterModule } from '@angular/router';

import { ShopMgrGuard } from '../auth';
import { ProductsPage } from './products.page';
import { ProductPage }  from './product';
import { OrdersPage }   from './orders';

const routes: Routes = [
    {
        /**
         * Products path
         */
        path: 'product',
        canActivate: [ShopMgrGuard],
        children: [

            /* List of products */
            { path: '', pathMatch: 'full', redirectTo: 'list/status/all/1' },
            { path: 'list',                redirectTo: 'list/status/all/1' },
            { path: 'list/:status',        redirectTo: 'list/status/:status/1' },
            { path: 'list/status/:status', redirectTo: 'list/status/:status/1' },
            { path: 'list/status/:status/:page', component: ProductsPage },

            /* Single product */
            { path: 'new', component: ProductPage },
            { path: ':id', component: ProductPage }
        ]
    },


    {
        /**
         * Order path
         */
        path: 'order',
        canActivate: [ShopMgrGuard],
        children: [

            /* List of orders */
            { path: '', pathMatch: 'full',      redirectTo: 'list/status/all/1' },
            { path: 'list',                     redirectTo: 'list/status/all/1' },
            { path: 'list/:status',             redirectTo: 'list/status/:status/1' },
            { path: 'list/status/:status',      redirectTo: 'list/status/:status/1' },
            { path: 'list/status/:status/:page', component: OrdersPage },
        ]
    },
];

export const routing = RouterModule.forChild(routes);