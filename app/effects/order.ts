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

    constructor (private actions$: Actions,
                 private http: Http) {}

    @Effect() loadOrders$ = this.actions$.ofType(OrderActions.LOAD_ORDERS)
        .switchMap(action => this.getOrders(action.payload))
        .map(orders => OrderActions.loadOrdersSuccess(orders))
        .catch(() => Observable.of(OrderActions.loadOrdersFail()));

    //////////////////////////////////////////////////////////////////////////
    // Private helper functions

    /**
     * Save single product/multiple products
     */
    private save(orders: Order[]): Observable<Order[]> {
        let api = '';
        let body = JSON.stringify(orders);

        let headers = new Headers({
            'Authorization': AuthCache.token(),
            'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this.http.post(api, body, options).map(res => res.json());
    }

    private getOrders(filters: any): Observable<any> {
        let cur_page = filters.cur_page;
        //let status   = filters.status;
        let api = AuthCache.API().orders + '/' + cur_page +
            '?per_page=' + PrefCache.getPerPage() +
            //'&status=' + status +
            '&token=' + AuthCache.token();
        return this.http.get(api).map(res => res.json());
    }
}