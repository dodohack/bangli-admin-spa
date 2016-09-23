/**
 * Single deal post
 * For each deal post, it belows to a cms topic, has cms categories and tags.
 */

import { Component } from '@angular/core';

@Component({ template: require('./post.page.html') })
export class DealPostPage
{
    constructor() {}
    
    canDeactivate() {
        return true;
    }
}
