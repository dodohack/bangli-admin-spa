/**
 * This is the component for page list page
 */

import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';

let template = require('./pages.html');
@Component({
    template: template
})
export class PagesPage implements OnInit
{
    constructor(private titleService: Title) {}

    ngOnInit()
    {
        this.titleService.setTitle('文档列表 - 葫芦娃管理平台');
    }
}