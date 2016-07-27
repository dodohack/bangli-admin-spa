/**
 * Get shop order/orders from API server
 */

import { Injectable }               from '@angular/core';
import { Jsonp, URLSearchParams }   from '@angular/http';
import {Observable} from "rxjs/Observable";

import { OrderStatus } from '../models/order';
import { AuthService } from './auth.service';
import { APP } from '../app.api';


@Injectable()
export class OrderService
{
    /* Number of posts per page */
    perPage: any;
    params: URLSearchParams;
    
    /* Order statuses */
    statuses: Observable<OrderStatus[]>;

    /**
     * Initialize common code in constructor, as we can't have ngOnInit
     * in injectable service.
     */
    constructor(private jsonp: Jsonp, private authService: AuthService)
    {
        /* Set up common JSONP request arguments */
        this.params = new URLSearchParams;
        this.params.set('callback', 'JSONP_CALLBACK');
        this.params.set('token', this.authService.getJwt());

        /* Init number of users showing per list if there is none */
        this.perPage = localStorage.getItem('ordersPerPage');
        if (!this.perPage)
            this.setOrdersPerPage(30);
        
        this.statuses = this.initStatuses();
    }

    /**
     * Set number of orders displayed per page
     */
    public setOrdersPerPage(count)
    {
        /* Count must be between [1, 200] */
        this.perPage = count < 1 ? 1 : (count > 200 ? 200 : count);
        localStorage.setItem('ordersPerPage', this.perPage);
    }

    /**
     * Get number of posts displayed per page
     */
    public getOrdersPerPage()
    {
        return this.perPage;
    }

    /**
     * Retrieve statuses of all orders
     */
    public initStatuses() {
        return this.jsonp
            .get(APP.order_statuses, {search: this.params})
            .map(res => res.json());
    }

    public getOrders(status, cur_page) {
        this.params.set('per_page', this.perPage);

        /* FIXME: This is not working as we can't see any header is with the request */
        //let headers = new Headers({'Authorization': 'Bearer ' + localStorage.getItem('jwt')});

        /* Setup endpoint and send request to it */
        let endpoint = APP.orders + '/' + status + '/' + cur_page;
        return this.jsonp
            .get(endpoint, {search: this.params})
            .map(res => res.json());
    }

    /**
     * Return the detail of given order id
     * @param id
     */
    public getOrder(id) {
        console.error("WE DO NOT NEED THIS! ALL ORDER DATA ARE DOWNLOADED WITH getOrders");

        let endpoint = APP.order + '/' + id;
        return this.jsonp
            .get(endpoint, {search: this.params})
            .map(res => res.json());
    }
}
