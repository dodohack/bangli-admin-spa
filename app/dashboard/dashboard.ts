/**
 * Admin home page
 */

import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Domain } from '../domain';

let template = require('./dashboard.html');
@Component({
    template: template
})
export class DashboardPage
{
    constructor(private titleService: Title) {
        this.titleService.setTitle('首页 - ' + Domain.getName() +'管理平台');
    }
}