/**
 * Admin home page
 */

import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';

import { AuthService } from '../service';

let t = require('./dashboard.html');
@Component({
    template: t
})
export class DashboardPage
{
    constructor(private titleService: Title,
                private authService: AuthService) {
        this.titleService.setTitle('首页 - ' + this.authService.curDomain.name +'管理平台');
    }
}
