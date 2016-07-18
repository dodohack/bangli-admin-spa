/**
 * This is the component for a single email template
 */

import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';

@Component({
    templateUrl: 'app/email/template.html'
})
export class EmailTemplatePage implements OnInit
{
    constructor(private titleService: Title) {}

    ngOnInit()
    {
        this.titleService.setTitle('邮件模板 - 葫芦娃管理平台');
    }
}
