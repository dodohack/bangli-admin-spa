/**
 * This is the component for email index page
 */

import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';

@Component({
    templateUrl: 'app/email/index.html'
})
export class EmailHomePage implements OnInit
{
    constructor(private titleService: Title) {}

    ngOnInit()
    {
        this.titleService.setTitle('邮件系统 - 葫芦娃管理平台');
    }
}
