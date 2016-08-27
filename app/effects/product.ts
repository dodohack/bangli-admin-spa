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

    api: string;
    headers: Headers;

    constructor (private actions$: Actions,
                 private http: Http) {
        this.headers = new Headers({
            'Authorization': 'Bearer' + AuthCache.token(),
            'Content-Type': 'application/json'});
        this.api = AuthCache.API();
    }

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
     * Get single product(may not use)
     */
    private getProduct(id: number): Observable<Product> {
        let api = this.api + AuthCache.API_PATH().shop_products +
            '/' + id + '?token=' + AuthCache.token();
        return this.http.get(api).map(res => res.json());
    }

    /**
     * Update single product
     */
    private putProduct(product: Product): Observable<Product> {
        let body = JSON.stringify(product);
        let options = new RequestOptions({ headers: this.headers });

        let api = this.api + AuthCache.API_PATH().shop_products + '/' + product.id;
        return this.http.put(api, body, options).map(res => res.json());
    }

    /**
     * Create a new product
     */
    private productProduct(product: Product): Observable<Product> {
        let body = JSON.stringify(product);

        let options = new RequestOptions({ headers: this.headers });

        let api = this.api + AuthCache.API_PATH().shop_products;
        return this.http.post(api, body, options).map(res => res.json());
    }

    /**
     * Delete a product
     */
    private deleteProduct(product: Product): Observable<Product> {
        let options = new RequestOptions({ headers: this.headers });

        let api = this.api + AuthCache.API_PATH().shop_products + '/' + product.id;
        return this.http.delete(api, options).map(res => res.json());
    }

    /**
     * Get products
     */
    private getProducts(filters: any): Observable<any> {
        let cur_page = filters.cur_page;
        let status   = filters.status;

        let api = this.api + AuthCache.API_PATH().products +
            '?page=' + cur_page +
            '&per_page=' + PrefCache.getPerPage() +
            '&status=' + status +
            '&token=' + AuthCache.token();

        return this.http.get(api).map(res => res.json());
    }

    /**
     * Update products
     */
    private putProducts(products: Product[]): Observable<Product[]> {
        let body = JSON.stringify(products);

        let options = new RequestOptions({ headers: this.headers });

        let api = this.api + AuthCache.API_PATH().shop_products_batch;
        return this.http.put(api, body, options).map(res => res.json());
    }

    /**
     * Delete products
     */
    private deleteProducts(products: Product[]): Observable<Product[]> {
        let body = JSON.stringify(products);

        let options = new RequestOptions({ headers: this.headers });

        let api = this.api + AuthCache.API_PATH().shop_products_batch;
        // TODO: http.delete can't have a body
        console.error("Unimplemented: deleteProducts");
        return this.http.delete(api, options).map(res => res.json());
    }
}