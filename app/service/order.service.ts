/**
 * Get shop order/orders from API server
 */

import { Injectable }                     from '@angular/core';
import { Http, Headers, RequestOptions }   from '@angular/http';

import { OrderStatus } from '../models/order';
import { AuthService } from './auth.service';

import { Api }            from '../api';
import { UserPreference } from '../preference';


@Injectable()
export class OrderService
{
    /* API endpoint of current domain */
    API: any;
    
    /* Http request headers */
    headers: Headers;
    options: RequestOptions;
    
    /* Order statuses */
    statuses: OrderStatus[];

    constructor(private http: Http, 
                private authService: AuthService)
    {
        console.log("OrderService initialized.");
        
        this.API = Api.getEndPoint();

        /* Set http authenticate header */
        this.headers =
            new Headers({'Authorization': 'Bearer ' + this.authService.getJwt()});
        this.options = new RequestOptions({ headers: this.headers });

        this.initStatuses();
    }


    public getOrders(status, cur_page) {
        /* http://api/admin/orders/{status}/{cur_page}?per_page=<number> */
        let endpoint = this.API.orders + '/' + status + '/' +
            cur_page + '?per_page=' + UserPreference.itemsPerList();
        return this.http.get(endpoint, this.options).map(res => res.json());
    }

    /**
     * Return the detail of given order id
     * @param id
     */
    public getOrder(id) {
        console.error("WE DO NOT NEED THIS! ALL ORDER DATA ARE DOWNLOADED WITH getOrders");

        return this.http.get(this.API.order + '/' + id, this.options)
                   .map(res => res.json());
    }

    /**
     * Retrieve statuses of all orders
     */
    private initStatuses() {
        this.http.get(this.API.order_statuses, this.options)
            .map(res => res.json())
            .subscribe(statuses => this.statuses = statuses);
    }
}
