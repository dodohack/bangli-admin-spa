/**
 * This is the component for single order
 */
import '@ngrx/core/add/operator/select';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { AppState }          from '../reducers';
import { ProductActions }    from '../actions';

import { Pagination, User, Product, ProductStatus } from '../models';
import { ProductService, UserService } from '../service';

import { zh_CN } from '../localization';

@Component({
    template: require('./products.page.html')
})
export class ProductsPage implements OnInit
{
    /* <list-page-menu> parameter */
    baseUrl = 'product/list';
    /* <paginator> parameter */
    deepUrl: string;

    /* Current order status of the listed orders */
    status: any;

    /* The list of products */
    products$: Observable<any>;

    /* If select all checkbox is checked or not */
    checkedAll = false;

    pagination = new Pagination;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>,
                private userService: UserService,
                private productService: ProductService) {
        this.products$ = this.store.select('products');
    }

    ngOnInit()
    {
        /* Get list of products when url changes */
        /* FIXME: Need to get pagination from url as well */
        /*
        this.products$ = this.route.params.select<string>('status')
            .switchMap(status => this.store.let(getProducts(status)));
        */

        // DEBUG
        this.route.params.subscribe(segment => {
            console.log("url segment array is : ", segment);
        })

        /* Get URL segments and update the list */
        /*
        this.route.params.subscribe(
            segment => {
                this.status = segment['status'] ? segment['status'] : 'all';
                this.deepUrl = this.baseUrl + '/status/' + this.status;
                this.pagination.current_page = segment['page'] ? +segment['page'] : 1;
                // Update order list when URL changes
                this.getProductsList();
            }
        );
        */
    }
    
    get zh() { return zh_CN.product; }
    get editors() { return this.userService.editors; }
    get statuses() { return this.productService.statuses; }

    private quickEdit($event) {

    }

    private getProductsList()
    {/*
        this.productService.getProducts(this.status, this.pagination.current_page)
            .subscribe(
                json => {
                    this.products = json['data'];
                    this.pagination.setup(json);
                },
                error => console.error(error),
                ()    => {
                    this.initCheckbox();
                }
            );
      */
    }

    /**
     * Add extra entries to the order
     */
    private initCheckbox() {
        /*
        let length = this.products.length;
        for (let i = 0; i < length; i++) {
            this.products[i].checked = false;
            this.products[i].editing = false;
        }
        */
    }

    /**
     * Toggle all checkbox
     */
    private checkboxAll()
    {
        /*
        this.checkedAll = !this.checkedAll;
        let length = this.products.length;
        for (let i = 0; i < length; i++) {
            this.products[i].checked = this.checkedAll;
        }
        */
    }

    /**
     * Change current table row to editable mode if double click on this
     * row is detected.
     *
     * @param $event  - mouse double click event
     * @param i       - index of table row, starts from 0
     */
    private fastEditCurrentProduct($event, i)
    {
        //this.products[i].editing = !this.products[i].editing;
        //console.log("double clicked detected: " + i);
        //console.log($event);
    }


    /**
     * Get product variations
     * @param product
     */
    private variations(product)
    {
        return JSON.parse(product['variations']);
    }
}