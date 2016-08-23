/**
 * Product[s] side effects
 */
import { Injectable }                     from '@angular/core';
import { Http, Headers, RequestOptions }  from '@angular/http';
import { Effect, Actions }                from '@ngrx/effects';
import { Observable }                     from 'rxjs/Observable';

import { ProductActions }  from '../actions';
import { Product }         from "../models";

@Injectable()
export class ProductEffects {
    /* Http request headers */
    headers: Headers;
    options: RequestOptions;

    constructor (private actions$: Actions,
                 private http: Http) {
        this.headers = new Headers({'Content-Type': 'application/json'});
        this.headers.append('Authorization', 'Bearer TODO: JWT TOKEN HERE');
        this.options = new RequestOptions({ headers: this.headers });
    }

    //////////////////////////////////////////////////////////////////////////
    // Private helper functions

    /**
     * Save single product/multiple products
     */
    private save(products: Product[]): Observable<Product[]> {
        let api = '';
        let body = JSON.stringify(products);
        return this.http.post(api, body, this.options).map(res => res.json());
    }

    /**
     * Get single product by it's id
     */
    private retrieve(id: number): Observable<Product> {
        let api = '' + '/' + id;
        return this.http.get(api, this.options).map(res => res.json());
    }

    /**
     * Get a list of products with pagination
     */
    private list(cur_page: number, status: string): Observable<Product[]> {
        let api = '' + '/' + status + '/' + cur_page + '?per_page=' + 20;
        return this.http.get(api, this.options).map(res => res.json());
    }

    /**
     * Get products statuses
     */
    /*
    private statuses(): Observable<any> {

    }
    */
}