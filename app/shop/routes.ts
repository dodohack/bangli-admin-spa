import { Routes } from '@angular/router';

import { ShopMgrGuard } from '../auth';
import { ProductsPage } from '.';
import { ProductPage }  from '.';
import { OrdersPage }   from '.';
import { OrderPage }    from '.';

export const shopRoutes: Routes = [
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