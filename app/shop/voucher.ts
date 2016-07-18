/**
 * This is the component for editing a voucher
 */

import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';

@Component({
    templateUrl: 'app/shop/voucher.html'
})
export class VoucherPage implements OnInit
{
    constructor(private titleService: Title) {}

    ngOnInit()
    {
        this.titleService.setTitle('编辑优惠券 - 葫芦娃管理平台');
    }
}
