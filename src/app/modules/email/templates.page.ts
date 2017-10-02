/**
 * This is the component for list of email templates
 */

import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';

@Component({ templateUrl: './templates.page.html' })
export class TemplatesPage implements OnInit
{
    constructor(private titleService: Title) {}

    ngOnInit()
    {
        this.titleService.setTitle('邮件模板列表 - 葫芦娃管理平台');
    }
}
