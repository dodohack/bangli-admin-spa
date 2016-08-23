/**
 * This is the module contains all user authentication related pages
 */
import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule}  from '../directives/shared.module';

import { routing }      from './routing';

import { OrderService }      from '../service';
import { ProductService }    from '../service';

import { ProductsList } from './components/products-list';
import { ProductsPage } from './products.page';
import { ProductPage }  from './product';
import { OrdersPage }   from './orders';

@NgModule({
    imports: [ CommonModule, SharedModule, routing ],
    declarations: [
        ProductsList,
        ProductsPage,
        ProductPage,
        OrdersPage
    ],
    providers: [
        OrderService,
        ProductService
    ]
})
export class ShopModule {}
