/*
 * This is the page template for all products
 */

import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';

@Component({
    templateUrl: 'app/pages/products.html',
    directives: [ROUTER_DIRECTIVES]
})
export class ProductsPage
{
    constructor() {}
}
