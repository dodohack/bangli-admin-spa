/**
 * This is the component for editing a voucher
 */

import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';

let template = require('./voucher.html');
@Component({
    template: template
})
export class VoucherPage implements OnInit
{
    constructor(private titleService: Title) {}

    ngOnInit()
    {
        this.titleService.setTitle('编辑优惠券 - 葫芦娃管理平台');
    }
}
