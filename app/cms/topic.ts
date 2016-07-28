/**
 * 
 */

import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';

let template = require('./topic.html');
@Component({
    template: template
})

export class TopicPage implements OnInit
{
    constructor(private titleService: Title) {}

    ngOnInit()
    {
        this.titleService.setTitle('编辑专题 - 葫芦娃管理平台');
    }
}
