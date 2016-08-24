/**
 * This is the module contains all user authentication related pages
 */
import { NgModule }     from '@angular/core';
import { SharedModule } from '../directives/shared.module';

import { routing }      from './routing';

import { ProductsList } from './components/products.list';
import { OrdersList }   from './components/orders.list';
import { ProductsPage } from './products.page';
import { ProductPage }  from './product.page';
import { OrdersPage }   from './orders.page';

@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [
        ProductsList,
        OrdersList,
        ProductsPage,
        ProductPage,
        OrdersPage
    ]
})
export class ShopModule {}

