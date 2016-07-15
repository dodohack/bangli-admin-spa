/**
 * This is the component for single order
 */

import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    templateUrl: 'app/pages/order_list.html',
    directives: [ROUTER_DIRECTIVES]
})
export class OrderListPage
{
    constructor() {}
}