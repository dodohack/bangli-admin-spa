/**
 * This is the component for a single newsletter
 */

import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';

let t = require('./home.html');
@Component({
    template: t
})
export class EmailHomePage implements OnInit
{
    constructor(private titleService: Title) {}

    ngOnInit()
    {
        this.titleService.setTitle('Email - 葫芦娃管理平台');
    }
}