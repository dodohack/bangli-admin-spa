/**
 *
 */
import { Component, Input } from "@angular/core";

import { Pagination } from '../models/pagination';

@Component({
    selector: 'paginator',
    template:
    `
    <div class="float-right paginator">
        <a class="btn btn-sm btn-secondary" 
            [routerLink]="['/', baseUrl, pagination.first_page]">
            <i class="fa fa-angle-double-left"></i>
        </a>
        <a class="btn btn-sm btn-secondary" 
            [routerLink]="['/', baseUrl, pagination.pre_page]">
            <i class="fa fa-angle-left"></i>
        </a>
        <a class="btn btn-sm btn-secondary" 
            [routerLink]="['/', baseUrl, pagination.next_page]">
            <i class="fa fa-angle-right"></i>
        </a>
        <a class="btn btn-sm btn-secondary" 
            [routerLink]="['/', baseUrl, pagination.last_page]">
            <i class="fa fa-angle-double-right"></i>
        </a>
    </div>
        `
})
export class PaginatorComponent {
    @Input()
    baseUrl: string;

    @Input()
    pagination: Pagination;

}