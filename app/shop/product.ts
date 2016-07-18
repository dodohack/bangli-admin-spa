/**
 * This is the component for single product editing page
 */

import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';

@Component({
    templateUrl: 'app/shop/product.html'
})
export class ProductPage implements OnInit
{
    constructor(private titleService: Title) {}

    ngOnInit()
    {
        this.titleService.setTitle('编辑产品 - 葫芦娃管理平台');
    }
}