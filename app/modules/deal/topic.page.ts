/**
 * Single deal topic
 */

import { Component } from '@angular/core';

@Component({ template: require('./topic.page.html') })
export class DealTopicPage
{
    constructor() {}

    canDeactivate() {
        return true;
    }
}
