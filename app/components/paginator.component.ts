/**
 *
 */
import { Component, Input } from "@angular/core";

import { Pagination } from '../models/pagination';

let template = require('./paginator.html');
@Component({
    selector: 'paginator',
    template: template
})
export class PaginatorComponent {
    @Input()
    baseUrl: string;

    @Input()
    pagination: Pagination;

}