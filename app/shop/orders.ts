/**
 * This is the component for orders list, single order editing.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

import { CARRIERS, ORDER_STATUSES, Order, Paginator } from '../models';
import { OrderService }      from '../service';

import { zh_CN }    from '../localization';

@Component({
    template: require('./orders.html')
})
export class OrdersPage implements OnInit
{
    hideRightPanel = true;
    
    /* Parameter to <list-page-menu> */
    baseUrl = 'order/list';
    /* Parameter to <paginator> */
    deepUrl: string;

    /* Current order status of the listed orders */
    status: any;

    /* The list of orders */
    orders: any;
    /* Order index and order, the order we are current editing */
    index: number;
    order: Order;

    /* If select all checkbox is checked or not */
    checkedAll: boolean = false;

    pagination = new Paginator;
    
    /* New an empty object array */
    alerts = Array<Object>();

    constructor(private route: ActivatedRoute,
                private orderService: OrderService) {}


    ngOnInit()
    {
        /* Get URL segments and update the list */
        this.route.params.subscribe(
            segment => {
                this.status = segment['status'] ? segment['status'] : 'all';
                this.deepUrl = this.baseUrl + '/status/' + this.status;
                this.pagination.cur_page = segment['page'] ? +segment['page'] : 1;
                /* Update order list when URL changes */
                this.getOrdersList();
            }
        );
    }

    get zh() { return zh_CN.order; }
    get statuses() { return this.orderService.statuses; }
    get availableStatuses() { return ORDER_STATUSES; }
    get availableCarriers() { return CARRIERS; }

    private getOrdersList()
    {
        this.orderService.getOrders(this.status, this.pagination.cur_page)
            .subscribe(
                json => {
                    this.orders = json['data'];
                    for (let i = 0; i < this.orders.length; i++) {
                        /* Convert MySQL JSON entries into array */
                        if (this.orders[i]['shippings'])
                            this.orders[i]['shippings'] = JSON.parse(this.orders[i]['shippings']);
                        if (this.orders[i]['billings'])
                            this.orders[i]['billings'] = JSON.parse(this.orders[i]['billings']);
                        if (this.orders[i]['update_history'])
                            this.orders[i]['update_history'] = JSON.parse(this.orders[i]['update_history']);
                        if (this.orders[i]['products'])
                            this.orders[i]['products'] = JSON.parse(this.orders[i]['products']);
                        //console.log(this.orders[i]['shippings']);
                    }
                    //this.pagination.setup(json);
                },
                error => console.error(error),
                ()    => {
                    this.initCheckbox();
                }
            );
    }

    /**
     * Add extra entries to the order
     */
    private initCheckbox() {
        let length = this.orders.length;
        for (let i = 0; i < length; i++) {
            this.orders[i].checked = false;
            this.orders[i].editing = false;
        }
    }

    /**
     * Toggle all checkbox
     */
    private checkboxAll()
    {
        this.checkedAll = !this.checkedAll;
        let length = this.orders.length;
        for (let i = 0; i < length; i++) {
            this.orders[i].checked = this.checkedAll;
        }
    }

    /**
     * Change current table row to editable mode if double click on this
     * row is detected.
     *
     * @param $event  - mouse double click event
     * @param i       - index of table row, starts from 0
     */
    private fastEditCurrentOrder($event, i)
    {
        this.orders[i].editing = !this.orders[i].editing;
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
    }
}