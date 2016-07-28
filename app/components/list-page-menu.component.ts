import { Component, Input } from '@angular/core';

let template = require('./list-page-menu.html');
@Component({
    selector: 'list-page-menu',
    template: template
})
export class ListPageMenuComponent {
    
    /* URL base for all menu items */
    @Input()
    baseUrl: string;

    /* Filter list items created by me */
    @Input()
    byMe: string;

    /* Filter list items by status */
    /* FIXME: Need to translate statuses[].status */
    @Input()
    statuses: string;

    /* Optional, filter list items by author */
    @Input()
    authors: string;

    /* Optional, filter list items by editor */
    @Input()
    editors: string;
}