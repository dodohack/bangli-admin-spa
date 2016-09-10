/**
 * This is the module contains all user authentication related pages
 */
import { NgModule }     from '@angular/core';
import { SharedModule } from '../directives/shared.module';

import { routing }      from './routing';

import { ProductList }  from './components/product.list';
import { OrderList }    from './components/order.list';
import { ProductsPage } from './products.page';
import { ProductPage }  from './product.page';
import { OrdersPage }   from './orders.page';
import { VouchersPage } from './vouchers.page';
import { CategoriesPage } from './categories.page';

@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [
        ProductList,
        OrderList,
        ProductsPage,
        ProductPage,
        OrdersPage,
        VouchersPage,
        CategoriesPage
    ]
})
export class ShopModule {}

