/**
 * Order[s] side effects
 */
import { Injectable }                     from '@angular/core';
import { Http, Headers, RequestOptions }  from '@angular/http';
import { Effect, Actions }                from '@ngrx/effects';
import { Observable }                     from 'rxjs/Observable';

import { AuthCache }       from '../auth.cache';
import { PrefCache }       from '../pref.cache';
import { OrderActions }    from '../actions';
import { Order }           from "../models";

@Injectable()
export class OrderEffects {

    headers: Headers;

    constructor (private actions$: Actions,
                 private http: Http) {
        this.headers = new Headers({
            'Authorization': 'Bearer' + AuthCache.token(),
            'Content-Type': 'application/json'});
    }

    @Effect() loadOrders$ = this.actions$.ofType(OrderActions.LOAD_ORDERS)
        .switchMap(action => this.getOrders(action.payload))
        .map(orders => OrderActions.loadOrdersSuccess(orders))
        .catch(() => Observable.of(OrderActions.loadOrdersFail()));

    //////////////////////////////////////////////////////////////////////////
    // Private helper functions

    /** 
     * Get single order(may not use)
     */
    private getOrder(id: number): Observable<Order> {
        let api = AuthCache.API().shop_orders +
            '/' + id + '?token=' + AuthCache.token();
        return this.http.get(api).map(res => res.json());
    }
    
    /**
     * Update single order
     */
    private putOrder(order: Order): Observable<Order> {
        let body = JSON.stringify(order);
        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API().shop_orders + '/' + order.id;
        return this.http.put(api, body, options).map(res => res.json());
    }

    /**
     * Create a new order
     */
    private postOrder(order: Order): Observable<Order> {
        let body = JSON.stringify(order);
        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API().shop_orders;
        return this.http.post(api, body, options).map(res => res.json());
    }

    /**
     * Delete a order
     */
    private deleteOrder(order: Order): Observable<Order> {
        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API().shop_orders + '/' + order.id;
        return this.http.delete(api, options).map(res => res.json());
    }

    /**
     * Get orders
     */
    private getOrders(filters: any): Observable<any> {
        let cur_page = filters.cur_page;
        let status   = filters.status;

        let api = AuthCache.API().orders +
            '?page=' + cur_page +
            '&per_page=' + PrefCache.getPerPage() +
            '&status=' + status +
            '&token=' + AuthCache.token();

        return this.http.get(api).map(res => res.json());
    }

    /**
     * Update orders
     */
    private putOrders(orders: Order[]): Observable<Order[]> {
        let body = JSON.stringify(orders);
        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API().shop_orders_batch;
        return this.http.put(api, body, options).map(res => res.json());
    }

    /**
     * Delete orders
     */
    private deleteOrders(orders: Order[]): Observable<Order[]> {
        let body = JSON.stringify(orders);
        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API().shop_orders_batch;
        // TODO: http.delete can't have a body
        //return this.http.delete(api, options).map(res => res.json());
    }
}