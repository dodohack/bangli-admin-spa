/**
 * This is the component for orders list, single order editing.
 */

import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Router }            from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';


import { EntitiesPage }      from '../base/entities.page';
import { AppState }          from '../../reducers';
import { ENTITY }            from '../../models';
import { Order, CARRIERS }   from '../../models';

import { zh_CN } from '../../localization';

@Component({ template: require('./orders.page.html') })
export class OrdersPage extends EntitiesPage
{
    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected router: Router) {
        super(ENTITY.SHOP_ORDER, route, store, router);
    }

    get zh() { return zh_CN.order; }

    get availableCarriers() { return CARRIERS; }
    
    /**
     * Get amount of products in given order
     * @param order
     */
    private orderItemCount(order)
    {
        //let json = JSON.parse(order['products']);
        let json = order['products'];
        
        let length = json.length;
        let count  = 0;
        for (let i = 0; i < length; i++)
        {
            count += +json[i].qty;
        }

        return count;
    }

    /**
     * Get tracking number of given order
     * @param order
     */
    private orderTracking(order: Order)
    {
        //let json = JSON.parse(order['shippings']);
        let json = order['shippings'];

        let length = json.length;
        let tracking = '';
        for (let i = 0; i < length; i++)
        {
            if (json[i].tracking)
                tracking += json[i].tracking + ',';
        }

        return tracking;
    }
    
}