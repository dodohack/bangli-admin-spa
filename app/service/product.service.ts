/**
 * Get shop product/products from API server
 */

import { Injectable }               from '@angular/core';
import { Jsonp, URLSearchParams }   from '@angular/http';
import { Observable }               from 'rxjs/Observable';

import { Category, Tag, ProductStatus } from '../models';
import { AuthService } from './auth.service';
import { APP } from '../app.api';

@Injectable()
export class ProductService
{

    /* Statuses of all products */
    statuses: ProductStatus[];
    /* Product categories and tags */
    categories: Category[];
    tags: Tag[];
    
    /* Number of posts per page */
    perPage: any;
    params: URLSearchParams;

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
            this.setProductsPerPage(30);

        this.initStatuses();
        this.initCategories();
        this.initTags();
    }

    /**
     * Set number of products displayed per page
     */
    public setProductsPerPage(count)
    {
        /* Count must be between [1, 200] */
        this.perPage = count < 1 ? 1 : (count > 200 ? 200 : count);
        localStorage.setItem('productsPerPage', this.perPage);
    }

    /**
     * Get number of products displayed per page
     */
    public getProductsPerPage()
    {
        return this.perPage;
    }

    public getProducts(status, cur_page) {
        this.params.set('per_page', this.perPage);

        /* FIXME: This is not working as we can't see any header is with the request */
        //let headers = new Headers({'Authorization': 'Bearer ' + localStorage.getItem('jwt')});

        /* Setup endpoint and send request to it */
        let endpoint = APP.products + '/' + status + '/' + cur_page;
        return this.jsonp
            .get(endpoint, {search: this.params})
            .map(res => res.json());
    }

    /**
     * Return the detail of given order id
     * @param id
     */
    public getProduct(id) {
        let endpoint = APP.product + '/' + id;
        return this.jsonp
            .get(endpoint, {search: this.params})
            .map(res => res.json());
    }


    /**
     * Retrieve statuses of all products
     */
    private initStatuses() {
        this.jsonp
            .get(APP.product_statuses, {search: this.params})
            .map(res => res.json())
            .subscribe(statuses => this.statuses = statuses);
    }

    /**
     * Return all product categories
     */
    private initCategories() {
        this.jsonp
            .get(APP.product_cats, {search: this.params})
            .map(res => res.json())
            .subscribe(cats => this.categories = cats);
    }

    /**
     * Return all product tags
     */
    private initTags() {
        this.jsonp
            .get(APP.product_tags, {search: this.params})
            .map(res => res.json())
            .subscribe(tags => this.tags = tags);
    }    
}
