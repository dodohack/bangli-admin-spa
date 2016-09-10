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
import { AlertActions }    from '../actions';
import { Order }           from "../models";
import { OrderParams }     from "../models";

@Injectable()
export class OrderEffects {

    constructor (private actions$: Actions,
                 private http: Http) {}

    get headers() {
        return new Headers({
            'Authorization': 'Bearer' + AuthCache.token(),
            'Content-Type': 'application/json'});
    }

    @Effect() loadOrders$ = this.actions$.ofType(OrderActions.LOAD_ORDERS)
        .switchMap(action => this.getOrders(action.payload))
        .map(orders => OrderActions.loadOrdersSuccess(orders))
        .catch(() => Observable.of(OrderActions.loadOrdersFail()));

    @Effect() loadOrder$ = this.actions$.ofType(OrderActions.LOAD_ORDER)
        .switchMap(action => this.getOrder(action.payload)
            .map(order => OrderActions.loadOrderSuccess(order))
            .catch(() => Observable.of(OrderActions.loadOrderFail()))
        );

    @Effect() putOrder$ = this.actions$.ofType(OrderActions.SAVE_ORDER)
        .switchMap(action => this.saveOrder(action.payload)
            .map(order => OrderActions.saveOrderSuccess(order))
            .catch(() => Observable.of(OrderActions.saveOrderFail()))
        );

    @Effect() saveOrderSuccess$ = this.actions$.ofType(OrderActions.SAVE_ORDER_SUCCESS)
        .map(action => AlertActions.success('订单保存成功!'));

    @Effect() saveOrderFail$ = this.actions$.ofType(OrderActions.SAVE_ORDER_FAIL)
        .map(action => AlertActions.error('订单保存失败!'));


    //////////////////////////////////////////////////////////////////////////
    // Private helper functions

    /** 
     * Get single order(may not use)
     */
    private getOrder(id: number): Observable<Order> {
        let api = AuthCache.API() + AuthCache.API_PATH().shop_orders +
            '/' + id + '?token=' + AuthCache.token();
        return this.http.get(api).map(res => res.json());
    }

    /**
     * Create/Update a order
     */
    private saveOrder(order: Order): Observable<Order> {
        console.log("SAVING ORDER: ", order);

        let body = JSON.stringify(order);
        let options = new RequestOptions({ headers: this.headers });

        if (order.id && order.id !== 0) {
            // Update an existing order
            let api = AuthCache.API() + AuthCache.API_PATH().shop_orders + '/' + order.id;
            return this.http.put(api, body, options).map(res => res.json());
        } else {
            // Create a new post
            let api = AuthCache.API() + AuthCache.API_PATH().shop_orders;
            return this.http.post(api, body, options).map(res => res.json());
        }
    }

    /**
     * Delete a order
     */
    private deleteOrder(order: Order): Observable<Order> {
        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API() + AuthCache.API_PATH().shop_orders + '/' + order.id;
        return this.http.delete(api, options).map(res => res.json());
    }

    /**
     * Get orders
     */
    private getOrders(params: OrderParams): Observable<any> {
        let api = AuthCache.API() + AuthCache.API_PATH().shop_orders
            + params.toQueryString()
            + '&per_page=' + PrefCache.getPerPage()
            + '&token=' + AuthCache.token();

        console.log("LOAD ORDER FROM URL: ", api);

        return this.http.get(api).map(res => res.json());
    }

    /**
     * Update orders
     */
    private putOrders(orders: Order[]): Observable<Order[]> {
        let body = JSON.stringify(orders);
        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API() + AuthCache.API_PATH().shop_orders_batch;
        return this.http.put(api, body, options).map(res => res.json());
    }

    /**
     * Delete orders
     */
    private deleteOrders(orders: Order[]): Observable<Order[]> {
        let body = JSON.stringify(orders);
        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API() + AuthCache.API_PATH().shop_orders_batch;
        // TODO: http.delete can't have a body
        console.error("Unimplemented: deleteOrders");
        return this.http.delete(api, options).map(res => res.json());
    }
}