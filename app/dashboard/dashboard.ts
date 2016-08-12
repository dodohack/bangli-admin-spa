/**
 * Admin home page
 */

import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DomainService } from '../service';

let template = require('./dashboard.html');
@Component({
    template: template
})
export class DashboardPage
{
    constructor(private titleService: Title,
                private domainService: DomainService) {
        this.titleService.setTitle('首页 - ' + this.domainService.name +'管理平台');
    }
    
    get hasDomain() { return this.domainService.key != 'dummy'; }
}
