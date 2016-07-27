/**
 * This is the component for single order
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Title }             from '@angular/platform-browser';

import { Pagination, User, Product, ProductStatus } from '../models';
import { ProductService, UserService } from '../service';
import {
    PaginatorComponent, SearchBoxComponent,
    ListPageHeaderComponent, ListPageMenuComponent } from "../components";

@Component({
    templateUrl: 'app/shop/products.html',
    directives: [
        PaginatorComponent,
        SearchBoxComponent,
        ListPageHeaderComponent,
        ListPageMenuComponent
    ],
    providers: [ ProductService ]
})
export class ProductsPage implements OnInit
{
    /* Pagination related variables of the list */
    pagination = new Pagination(0, 1, 0, 0, 1, 0, 0, 0, 0);

    /* <paginator> parameter */
    base = 'product/list';
    baseUrl: string;

    /* <list-page-header> parameter */
    pageTitle = '商品';
    newItemUrl = 'product/new';

    /* Statuses of all products */
    statuses: ProductStatus[];

    /* Current order status of the listed orders */
    status: any;

    /* The list of products */
    products: Product[];
    
    /* Editors object */
    editors: User[];

    /* If select all checkbox is checked or not */
    checkedAll: boolean = false;

    constructor(private route: ActivatedRoute,
                private userService: UserService,
                private productService: ProductService,
                private titleService: Title) {}

    ngOnInit()
    {
        this.titleService.setTitle('订单列表 - 葫芦娃管理平台');
        this.pagination.per_page = this.productService.getProductsPerPage();

        this.initProductStatuses();
        this.initEditors();

        /* Get URL segments and update the list */
        this.route.params.subscribe(
            segment => {
                this.status = segment['status'] ? segment['status'] : 'all';
                this.baseUrl = this.base + '/' + this.status;
                this.pagination.current_page = segment['page'] ? +segment['page'] : 1;
                /* Update order list when URL changes */
                this.getProductsList();
            }
        );
    }

    /**
     * Get editors
     */
    private initEditors()
    {
        this.userService.authors.subscribe(
            authors =>
                this.editors = authors.filter(people => people.role != 'author')
        );
    }

    /**
     * Get products list page menu
     */
    private initProductStatuses()
    {
        this.productService.statuses.subscribe(
            json => this.statuses = json,
            error => console.error(error)
        );
    }

    private getProductsList()
    {
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
    }

    /**
     * Add extra entries to the order
     */
    private initCheckbox() {
        let length = this.products.length;
        for (let i = 0; i < length; i++) {
            this.products[i].checked = false;
            this.products[i].editing = false;
        }
    }


    /**
     * Set number of products displayed per list
     */
    public setProductsPerPage()
    {
        this.productService.setProductsPerPage(this.pagination.per_page);
        /* Update the list view */
        this.getProductsList();
    }


    /**
     * Toggle all checkbox
     */
    private checkboxAll()
    {
        this.checkedAll = !this.checkedAll;
        let length = this.products.length;
        for (let i = 0; i < length; i++) {
            this.products[i].checked = this.checkedAll;
        }
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
        this.products[i].editing = !this.products[i].editing;
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