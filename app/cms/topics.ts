/**
 * This is the component for topic list page
 */

import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';

@Component({
    templateUrl: 'app/cms/topics.html'
})
export class TopicsPage implements OnInit
{
    constructor(private titleService: Title) {}

    ngOnInit()
    {
        this.titleService.setTitle('专题列表 - 葫芦娃管理平台');
    }
}