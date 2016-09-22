/**
 * Single deal post
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
