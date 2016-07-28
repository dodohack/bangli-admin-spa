/**
 * This is the component for managing vouchers
 */

import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';

let template = require('./vouchers.html');
@Component({
    template: template
})
export class VouchersPage implements OnInit
{
    constructor(private titleService: Title) {}

    ngOnInit()
    {
        this.titleService.setTitle('管理优惠券 - 葫芦娃管理平台');
    }
}
