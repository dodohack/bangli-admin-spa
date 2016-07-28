/**
 * This is the component for a single email template
 */

import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';

let template = require('./template.html');
@Component({
    template: template
})
export class EmailTemplatePage implements OnInit
{
    constructor(private titleService: Title) {}

    ngOnInit()
    {
        this.titleService.setTitle('邮件模板 - 葫芦娃管理平台');
    }
}
