/**
 * This is the module contains all user authentication related pages
 */
import { NgModule }     from '@angular/core';
import { SharedModule } from '../directives/shared.module';

import { routing }      from './routing';

import { ProductsList } from './components/products.list';
import { ProductsPage } from './products.page';
import { ProductPage }  from './product';
import { OrdersPage }   from './orders';

@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [
        ProductsList,
        ProductsPage,
        ProductPage,
        OrdersPage
    ]
})
export class ShopModule {}

