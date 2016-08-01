/**
 * Shop product category management component
 */
import { Component, OnInit }    from '@angular/core';
import { Title }                from '@angular/platform-browser';

import { ProductService }       from '../service/product.service';

let template = require('./product-categories.html');
@Component({
    template: template,
    providers: [ProductService]
})
export class ProductCategoriesPage implements OnInit
{
    constructor(private productService: ProductService,
                private titleService: Title) {}

    ngOnInit()
    {
        this.titleService.setTitle('商品分类 - 葫芦娃');
    }

    get categories() { return this.productService.categories; }
}