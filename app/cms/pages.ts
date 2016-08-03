/**
 * This is the component for page list page
 */

import { Component, OnInit } from '@angular/core';
import { UserService, PageService } from '../service';
import { ListPageHeaderComponent, ListPageMenuComponent } from '../components';
import { zh_CN } from '../localization';

let template = require('./pages.html');
@Component({
    template: template,
    directives: [
        ListPageHeaderComponent,
        ListPageMenuComponent
    ],
    providers: [ PageService ]
})
export class PagesPage implements OnInit
{
    baseUrl = 'page/list';

    constructor(private userService: UserService,
                private pageService: PageService) {}

    ngOnInit() {
    }

    get zh()       { return zh_CN.post; }
    get editors()  { return this.userService.editors; }
    get statuses() { return this.pageService.statuses; }
}
