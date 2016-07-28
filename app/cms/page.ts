/**
 * This is the component for single page
 */

import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';

let template = require('./page.html');
@Component({
    template: template
})
export class PagePage implements OnInit
{
    constructor(private titleService: Title) {}

    ngOnInit()
    {
        this.titleService.setTitle('编辑文档 - 葫芦娃管理平台');
    }
}
