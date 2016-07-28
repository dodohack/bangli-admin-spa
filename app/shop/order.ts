/**
 * This is the component for single order
 */

import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';

let template = require('./order.html');
@Component({
    template: template
})
export class OrderPage implements OnInit
{
    constructor(private titleService: Title) {}

    ngOnInit()
    {
        this.titleService.setTitle('编辑订单 - 葫芦娃管理平台');
    }
}