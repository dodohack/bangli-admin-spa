/**
 * This is the component for list of email templates
 */

import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';

@Component({
    templateUrl: 'app/email/templates.html'
})
export class EmailTemplatesPage implements OnInit
{
    constructor(private titleService: Title) {}

    ngOnInit()
    {
        this.titleService.setTitle('邮件模板列表 - 葫芦娃管理平台');
    }
}
