/**
 * This is the post list management page component
 */

import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { Pagination }  from '../datatype/pagination';

@Component({
    templateUrl: 'app/cms/posts.html',
    directives: [ROUTER_DIRECTIVES]
})
export class PostsPage
{
    constructor() {}
}