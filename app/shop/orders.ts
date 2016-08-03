/**
 * This is the component for single order
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

import { OrderStatus, Pagination }     from '../models';
import { OrderService } from '../service/order.service';
import {
    PaginatorComponent, DateFilterComponent,
    SearchBoxComponent, ListPageHeaderComponent,
    ListPageMenuComponent } from "../components";

import { zh_CN }    from '../localization';

let template = require('./orders.html');
@Component({
    template: template,
    directives: [
        PaginatorComponent,
        DateFilterComponent,
        SearchBoxComponent,
        ListPageHeaderComponent,
        ListPageMenuComponent
    ],
    providers: [ OrderService ]
})
export class OrdersPage implements OnInit
{
    /* Parameter to <list-page-menu> */
    baseUrl = 'order/list';
    /* Parameter to <paginator> */
    deepUrl: string;

    /* Current order status of the listed orders */
    status: any;

    /* The list of orders */
    orders: any;

    /* If select all checkbox is checked or not */
    checkedAll: boolean = false;

    pagination = new Pagination;

    constructor(private route: ActivatedRoute,
                private orderService: OrderService) {}


    ngOnInit()
    {
        /* Get URL segments and update the list */
        this.route.params.subscribe(
            segment => {
                this.status = segment['status'] ? segment['status'] : 'all';
                this.deepUrl = this.baseUrl + '/status/' + this.status;
                this.pagination.current_page = segment['page'] ? +segment['page'] : 1;
                /* Update order list when URL changes */
                this.getOrdersList();
            }
        );
    }

    get zh() { return zh_CN.order; }
    get statuses() { return this.orderService.statuses; }

    private getOrdersList()
    {
        this.orderService.getOrders(this.status, this.pagination.current_page)
            .subscribe(
                json => {
                    this.orders = json['data'];
                    this.pagination.setup(json);
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
        let json = JSON.parse(order['products']);
        
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
    private orderTracking(order)
    {
        let json = JSON.parse(order['shippings']);

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