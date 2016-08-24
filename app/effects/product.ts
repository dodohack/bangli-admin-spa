/**
 * Product[s] side effects
 */
import { Injectable }                     from '@angular/core';
import { Http, Headers, RequestOptions }  from '@angular/http';
import { Effect, Actions }                from '@ngrx/effects';
import { Observable }                     from 'rxjs/Observable';

import { AuthCache }       from '../auth.cache';
import { PrefCache }       from '../pref.cache';
import { ProductActions }  from '../actions';
import { Product }         from "../models";

@Injectable()
export class ProductEffects {

    constructor (private actions$: Actions,
                 private http: Http) {}

    @Effect() loadProducts$ = this.actions$.ofType(ProductActions.LOAD_PRODUCTS)
        .switchMap(action => this.getProducts(action.payload))
        .map(products => ProductActions.loadProductsSuccess(products))
        .catch(() => Observable.of(ProductActions.loadProductsFail()));

    @Effect() loadProduct$ = this.actions$.ofType(ProductActions.LOAD_PRODUCT)
        .switchMap(action => this.getProduct(action.payload))
        .map(product => ProductActions.loadProductSuccess(product))
        .catch(() => Observable.of(ProductActions.loadProductFail()));
    
    //////////////////////////////////////////////////////////////////////////
    // Private helper functions

    /**
     * Save single product/multiple products
     */
    private save(products: Product[]): Observable<Product[]> {
        let api = '';
        let body = JSON.stringify(products);

        let headers = new Headers({
            'Authorization': AuthCache.token(),
            'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this.http.post(api, body, options).map(res => res.json());
    }

    private getProducts(filters: any): Observable<any> {
        let cur_page = filters.cur_page;
        //let status   = filters.status;
        let api = AuthCache.API().products + '/' + cur_page +
            '?per_page=' + PrefCache.getPerPage() +
            //'&status=' + status +
            '&token=' + AuthCache.token();
        return this.http.get(api).map(res => res.json());
    }


    private getProduct(id: string): Observable<Product> {
        let api = AuthCache.API().product + '/' + id + '?token=' + AuthCache.token();
        return this.http.get(api).map(res => res.json());
    }
}