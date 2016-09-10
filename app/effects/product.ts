/**
 * Product[s] side effects
 */
import { Injectable }                     from '@angular/core';
import { Http, Headers, RequestOptions }  from '@angular/http';
import { Effect, Actions }                from '@ngrx/effects';
import { Observable }                     from 'rxjs/Observable';

import { AlertActions }    from '../actions';
import { AuthCache }       from '../auth.cache';
import { PrefCache }       from '../pref.cache';
import { ProductActions }  from '../actions';
import { Product }         from "../models";
import { ProductParams }   from "../models";

@Injectable()
export class ProductEffects {
    constructor (private actions$: Actions,
                 private http: Http) { }

    get headers() {
        return new Headers({
            'Authorization': 'Bearer' + AuthCache.token(),
            'Content-Type': 'application/json'});
    }

    @Effect() loadProducts$ = this.actions$.ofType(ProductActions.LOAD_PRODUCTS)
        .switchMap(action => this.getProducts(action.payload))
        .map(products => ProductActions.loadProductsSuccess(products))
        .catch(() => Observable.of(ProductActions.loadProductsFail()));

    @Effect() loadProduct$ = this.actions$.ofType(ProductActions.LOAD_PRODUCT)
        .switchMap(action => this.getProduct(action.payload))
        .map(product => ProductActions.loadProductSuccess(product))
        .catch(() => Observable.of(ProductActions.loadProductFail()));

    @Effect() putProduct$ = this.actions$.ofType(ProductActions.SAVE_PRODUCT)
        .switchMap(action => this.saveProduct(action.payload)
            .map(product => ProductActions.saveProductSuccess(product))
            .catch(() => Observable.of(ProductActions.saveProductFail()))
        );

    @Effect() saveProductSuccess$ = this.actions$.ofType(ProductActions.SAVE_PRODUCT_SUCCESS)
        .map(action => AlertActions.success('产品保存成功!'));

    @Effect() saveProductFail$ = this.actions$.ofType(ProductActions.SAVE_PRODUCT_FAIL)
        .map(action => AlertActions.error('产品保存失败!'));

    //////////////////////////////////////////////////////////////////////////
    // Private helper functions

    /**
     * Get single product(may not use)
     */
    private getProduct(id: number): Observable<Product> {
        let api = AuthCache.API() + AuthCache.API_PATH().shop_products +
            '/' + id + '?token=' + AuthCache.token();
        return this.http.get(api).map(res => res.json());
    }

    /**
     * Create/Update a post
     */
    private saveProduct(product: Product): Observable<Product> {
        console.log("SAVING PRODUCT: ", product);

        let body = JSON.stringify(product);
        let options = new RequestOptions({ headers: this.headers });

        if (product.id && product.id !== 0) {
            // Update an existing post
            let api = AuthCache.API() + AuthCache.API_PATH().shop_products + '/' + product.id;
            return this.http.put(api, body, options).map(res => res.json());
        } else {
            // Create a new post
            let api = AuthCache.API() + AuthCache.API_PATH().cms_posts;
            return this.http.post(api, body, options).map(res => res.json());
        }
    }


    /**
     * Delete a product
     */
    private deleteProduct(product: Product): Observable<Product> {
        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API() + AuthCache.API_PATH().shop_products + '/' + product.id;
        return this.http.delete(api, options).map(res => res.json());
    }

    /**
     * Get products
     */
    private getProducts(params: ProductParams): Observable<any> {
        let api = AuthCache.API() + AuthCache.API_PATH().shop_products
            + params.toQueryString()
            + '&per_page=' + PrefCache.getPerPage()
            + '&token=' + AuthCache.token();

        return this.http.get(api).map(res => res.json());
    }

    /**
     * Update products
     */
    private putProducts(products: Product[]): Observable<Product[]> {
        let body = JSON.stringify(products);

        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API() + AuthCache.API_PATH().shop_products_batch;
        return this.http.put(api, body, options).map(res => res.json());
    }

    /**
     * Delete products
     */
    private deleteProducts(products: Product[]): Observable<Product[]> {
        let body = JSON.stringify(products);

        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API() + AuthCache.API_PATH().shop_products_batch;
        // TODO: http.delete can't have a body
        console.error("Unimplemented: deleteProducts");
        return this.http.delete(api, options).map(res => res.json());
    }
}