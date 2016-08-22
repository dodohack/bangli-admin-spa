/**
 * This is the module contains all user authentication related pages
 */
import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule}  from '../directives/shared.module';

import { routing }      from './routing';

import { ProductsPage } from './products';
import { ProductPage }  from './product';
import { OrdersPage }   from './orders';

@NgModule({
    imports: [ CommonModule, SharedModule, routing ],
    declarations: [
        ProductsPage,
        ProductPage,
        OrdersPage
    ]
})
export class ShopModule {}
