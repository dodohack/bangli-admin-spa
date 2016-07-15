/**
 * This is the single post edit page component
 */

import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    templateUrl: 'app/cms/post.html',
    directives: [ROUTER_DIRECTIVES]
})
export class PostPage
{
    constructor() {}
}