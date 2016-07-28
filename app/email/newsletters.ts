/**
 * This is the component for newsletter list page
 */

import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';

let template = require('./newsletters.html');
@Component({
    template: template
})
export class NewslettersPage implements OnInit
{
    constructor(private titleService: Title) {}

    ngOnInit()
    {
        this.titleService.setTitle('Newsletter列表 - 葫芦娃管理平台');
    }
}