/**
 * Admin home page
 */

import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Component({ templateUrl: './dashboard.page.html' })
export class DashboardPage
{
    constructor(private titleService: Title) {
        //this.titleService.setTitle('首页 - ' + this.authService.curDomain.name +'管理平台');
    }
}
