/**
 * Get shop product/products from API server
 */

import { Injectable }                    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Category, Tag, ProductStatus } from '../models';
import { AuthService }    from './auth.service';
import { Api }            from '../api';
import { UserPreference } from '../preference';

@Injectable()
export class ProductService
{
    /* API endpoint of current domain */
    API: any;

    /* Http request headers */
    headers: Headers;
    options: RequestOptions;

    /* Statuses of all products */
    statuses: ProductStatus[];

    /* Product categories and tags */
    categories: Category[];

    tags: Tag[];

    constructor(private http: Http,
                private authService: AuthService)
    {
        console.log("ProductService initialized.");

        this.API = Api.getEndPoint();

        /* Set http authenticate header */
        this.headers =
            new Headers({'Authorization': 'Bearer ' + this.authService.getJwt()});
        this.options = new RequestOptions({ headers: this.headers });

        this.initStatuses();
        this.initCategories();
        this.initTags();
    }

    public getProducts(status, cur_page) {
        /* http://api/admin/productrs/{status}/{cur_page}?per_page=<number> */
        let endpoint = this.API.products + '/' + status + '/' +
            cur_page + '?per_page=' + UserPreference.itemsPerList();

        return this.http.get(endpoint, this.options).map(res => res.json());
    }

    /**
     * Return the detail of given order id
     * @param id
     */
    public getProduct(id) {
        return this.http.get(this.API.product + '/' + id, this.options)
                   .map(res => res.json());
    }

    /**
     * Retrieve statuses of all products
     */
    private initStatuses() {
        this.http.get(this.API.product_statuses, this.options)
            .map(res => res.json())
            .subscribe(statuses => this.statuses = statuses);
    }

    /**
     * Return all product categories
     */
    private initCategories() {
        this.http.get(this.API.product_cats, this.options)
            .map(res => res.json())
            .subscribe(cats => this.categories = cats);
    }

    /**
     * Return all product tags
     */
    private initTags() {
        this.http.get(this.API.product_tags, this.options)
            .map(res => res.json())
            .subscribe(tags => this.tags = tags);
    }    
}
