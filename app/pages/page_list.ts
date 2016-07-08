/**
 * This is the component for page list page
 */

import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    templateUrl: 'app/pages/page_list.html',
    directives: [ROUTER_DIRECTIVES]
})
export class PageListPage
{
    constructor() {}
}