/**
 * This is the component for single order
 */

import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';

@Component({
    templateUrl: 'app/shop/orders.html'
})
export class OrdersPage implements OnInit
{
    constructor(private titleService: Title) {}

    ngOnInit()
    {
        this.titleService.setTitle('订单列表 - 葫芦娃管理平台');
    }
}