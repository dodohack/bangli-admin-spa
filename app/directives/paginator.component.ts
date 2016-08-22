/**
 *
 */
import { Component, Input } from "@angular/core";

import { Pagination } from '../models/pagination';

@Component({
    selector: 'paginator',
    template: require('./paginator.html')
})
export class PaginatorComponent {
    @Input()
    baseUrl: string;

    @Input()
    pagination: Pagination;

}