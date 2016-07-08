/**
 * This is the component for single page
 */

import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    templateUrl: 'app/pages/page.html',
    directives: [ROUTER_DIRECTIVES]
})
export class PagePage
{
    constructor() {}
}