import { Routes, RouterModule } from '@angular/router';

import { ShopMgrGuard } from '../auth';
import { ProductsPage } from './products.page';
import { ProductPage }  from './product.page';
import { OrdersPage }   from './orders.page';

const routes: Routes = [
    {
        /**
         * Products path
         */
        path: 'product',
        canActivate: [ShopMgrGuard],
        children: [

            /* List of products */
            { path: '', pathMatch: 'full', redirectTo: 'page/1/status/all' },
            { path: 'page/:page',          redirectTo: 'page/:page/status/all' },
            { path: 'page/:page/status/:status', component: ProductsPage },

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
            { path: '', pathMatch: 'full',      redirectTo: 'page/1/status/all' },
            { path: 'page/:page',               redirectTo: 'page/:page/status/all' },
            { path: 'page/:page/status/:status', component: OrdersPage },
        ]
    },
];

export const routing = RouterModule.forChild(routes);