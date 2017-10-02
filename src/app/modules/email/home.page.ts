/**
 * This is the component for a single newsletter
 */

import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';

@Component({ templateUrl: './home.page.html' })
export class EmailHomePage implements OnInit
{
    constructor(private titleService: Title) {}

    ngOnInit()
    {
        this.titleService.setTitle('Email - 葫芦娃管理平台');
    }
}
