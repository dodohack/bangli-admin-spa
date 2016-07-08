/**
 * This is the component for managing products
 */

import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    templateUrl: 'app/pages/product_list.html',
    directives: [ROUTER_DIRECTIVES]
})
export class ProductListPage
{
    constructor() {}
}