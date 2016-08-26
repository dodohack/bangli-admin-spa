/**
 * Page list of deals
 */

import { Component } from '@angular/core';

@Component({ template: require('./deals.page.html') })
export class DealsPage
{
    constructor() {}

    canDeactivate() {
        return true;
    }
}
