/**
 * This is the component for single order
 */

import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';
import { ActivatedRoute, CanDeactivate } from '@angular/router';
import { AlertComponent } from 'ng2-bootstrap';

import { Order } from '../models';
import { OrderService } from '../service';
import { zh_CN } from '../localization';

let template = require('./order.html');
@Component({
    template: template,
    directives: [ AlertComponent ],
    providers: [ OrderService ]
})
export class OrderPage implements OnInit
{
    /* Current we are editing */
    order = new Order;

    constructor(private route: ActivatedRoute,
                private orderService: OrderService,
                private titleService: Title) {}

    ngOnInit() {
        this.titleService.setTitle('编辑订单 - 葫芦娃管理平台');
        
        this.initOrder();
    }
    
    get zh() { return zh_CN.order; }
    
    private initOrder() {
        this.route.params.subscribe(
            segment => {
                /* Get post id from URL segment */
                this.order.id = segment['id'] ? +segment['id'] : 0;
            }
        );

        if (!this.order.id)
            return;

        this.orderService.getOrder(this.order.id)
            .subscribe(order=> this.order= order);
    }
}