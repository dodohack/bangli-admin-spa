/**
 * This is the component for products
 */
import '@ngrx/core/add/operator/select';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { AppState }          from '../reducers';
import { ProductActions }    from '../actions';

import { Paginator, User, Product, ProductStatus } from '../models';
import { ProductService, UserService } from '../service';

import { zh_CN } from '../localization';

@Component({
    template: require('./products.page.html')
})
export class ProductsPage implements OnInit
{
    /* Products state in ngrx */
    productsState$: Observable<any>;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {
        this.productsState$ = this.store.select('products');
    }

    ngOnInit()
    {
        /* TODO: Get status from url as well */
        this.route.params.subscribe(params => {
            let cur_page = params['page'] ? params['page'] : '1';
            this.store.dispatch(ProductActions.loadProducts({cur_page: cur_page}));
        });
    }
    
    get zh() { return zh_CN.product; }
    //get editors() { return this.userService.editors; }
    //get statuses() { return this.productService.statuses; }
    private quickEdit($event) { }

    /**
     * Get product variations
     * @param product
     */
    private variations(product)
    {
        return JSON.parse(product['variations']);
    }
}