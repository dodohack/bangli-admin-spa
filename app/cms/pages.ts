/**
 * This is the component for page list page
 */

import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';

@Component({
    templateUrl: 'app/cms/pages.html'
})
export class PagesPage implements OnInit
{
    constructor(private titleService: Title) {}

    ngOnInit()
    {
        this.titleService.setTitle('文档列表 - 葫芦娃管理平台');
    }
}