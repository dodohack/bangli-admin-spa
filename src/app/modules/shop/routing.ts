import { Routes, RouterModule } from '@angular/router';

import { ShopMgrGuard } from '../../guard';
import { ProductsPage } from './products.page';
import { ProductPage }  from './product.page';
import { OrdersPage }   from './orders.page';
import { VouchersPage } from './vouchers.page';
import { CategoriesPage} from './categories.page';

const routes: Routes = [
    {
        /**
         * Products path
         */
        path: 'product',
        canActivate: [ShopMgrGuard],
        children: [

            /* List of products */
            { path: '', pathMatch: 'full', redirectTo: 'page/1/state/all' },
            { path: 'page/:page',          redirectTo: 'page/:page/state/all' },
            { path: 'page/:page/state/:state', component: ProductsPage },

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
            { path: '', pathMatch: 'full',      redirectTo: 'page/1/state/all' },
            { path: 'page/:page',               redirectTo: 'page/:page/state/all' },
            { path: 'page/:page/state/:state', component: OrdersPage },
        ]
    },


    {
        path: 'voucher',
        canActivate: [ShopMgrGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'page/1/state/all' },
            { path: 'page/:page', redirectTo: 'page/:page/state/all' },
            { path: 'page/:page/state/:state', component: VouchersPage }
        ]
    },

    {path: 'categories/product', component: CategoriesPage, canActivate: [ShopMgrGuard]},
];

export const routing = RouterModule.forChild(routes);