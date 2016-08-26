/**
 * This is the component for orders list, single order editing.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { AppState }          from '../../reducers';
import { OrderActions }      from '../../actions';

import { CARRIERS, ORDER_STATUSES, Order, Paginator } from '../../models';
import { zh_CN }    from '../../localization';

@Component({ template: require('./orders.page.html') })
export class OrdersPage implements OnInit
{
    hideRightPanel = true;

    /* Order index and order, the order we are current editing */
    index: number;
    order: Order;

    /* If select all checkbox is checked or not */
    checkedAll: boolean = false;

    /* Orders state in ngrx */
    ordersState$: Observable<any>;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {
        this.ordersState$ = this.store.select('orders');
    }


    ngOnInit()
    {
        /* TODO: Get status from url as well*/
        this.route.params.subscribe(params => {
            let cur_page = params['page'] ? params['page'] : '1';
            this.store.dispatch(OrderActions.loadOrders({cur_page: cur_page}));
        });
    }

    get zh() { return zh_CN.order; }

    //get statuses() { return this.orderService.statuses; }
    get availableStatuses() { return ORDER_STATUSES; }
    get availableCarriers() { return CARRIERS; }

    /**
     * Change current table row to editable mode if double click on this
     * row is detected.
     *
     * @param $event  - mouse double click event
     * @param i       - index of table row, starts from 0
     */
    private fastEditCurrentOrder($event, i)
    {
        //this.orders[i].editing = !this.orders[i].editing;
        //console.log("double clicked detected: " + i);
        //console.log($event);
    }

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
    
    private editOrder(index: number)
    {
        /*
        if (index < 0) {
            index = 0;
            this.alerts.push({type: 'danger', msg: '已经是第一个订单了!'});
        }

        if (index > this.orders.length - 1) {
            index = this.orders.length - 1;
            this.alerts.push({type: 'danger', msg: '已经是最后一个订单了!'});
        }

        this.hideRightPanel = false;
        this.index = index;
        this.order = this.orders[this.index];
        */
    }
}