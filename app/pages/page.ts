/*
 * This is the page template
 */

import { Component, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { PageService } from '../service/page.service';

@Component({
    template: '<p>This is the page template for all docs.</p>'
})
export class Page implements OnInit
{
    /* page object holds information including title, content etc.*/
    page: any;

    constructor(private pageService: PageService,
                private routeParams: RouteParams) {}

    ngOnInit() {
        let slug = +this.routeParams.get('slug');
        this.pageService.getPage(slug)
            .subscribe(
                page   => this.page = page,
                error  => console.error(error),
                ()     => console.log('Done!')
            );
    }
}
