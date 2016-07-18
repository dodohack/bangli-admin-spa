/**
 * This is the component for managing products
 */

import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';

@Component({
    templateUrl: 'app/shop/products.html'
})
export class ProductsPage implements OnInit
{
    constructor(private titleService: Title) {}

    ngOnInit()
    {
        this.titleService.setTitle('产品列表 - 葫芦娃管理平台');
    }
}
