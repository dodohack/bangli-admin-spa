/**
 * List of deal topic
 */

import { Component } from '@angular/core';

@Component({ template: require('./topics.page.html') })
export class DealTopicsPage
{
    constructor() {}

    canDeactivate() {
        return true;
    }
}
