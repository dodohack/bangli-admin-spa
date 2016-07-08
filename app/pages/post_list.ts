/**
 * This is the post list management page component
 */

import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    templateUrl: 'app/pages/post_list.html',
    directives: [ROUTER_DIRECTIVES]
})
export class PostListPage
{
    constructor() {}
}