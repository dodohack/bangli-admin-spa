import { RouterConfig } from '@angular/router';

import { AuthGuard }    from '../auth/guard';
import { ProductsPage } from './products';
import { ProductPage }  from './product';
import { OrdersPage }   from './orders';
import { OrderPage }    from './order';

export const shopRoutes: RouterConfig = [
    {
        /**
         * Products path
         */
        path: 'product',
        canActivate: [AuthGuard],
        children: [

            /* List of products */
            { path: '', pathMatch: 'full', redirectTo: 'list/all/1' },
            { path: 'list/:status', redirectTo: 'list/:status/1' },
            { path: 'list/:status/:page', component: ProductsPage },

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
        canActivate: [AuthGuard],
        children: [

            /* List of orders */
            { path: '', pathMatch: 'full', redirectTo: 'list/all/1' },
            { path: 'list/:status', redirectTo: 'list/:status/1' },
            { path: 'list/:status/:page', component: OrdersPage },

            /* Single order */
            { path: 'new', component: OrderPage },
            { path: ':id', component: OrderPage }
        ]
    },
];