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
        <span>共{{ pagination.total }}条 | 第{{ pagination.current_page }}/{{ pagination.last_page }} 页</span>
        
        <a *ngIf="pagination.current_page != pagination.first_page" 
           class="btn btn-sm btn-secondary" [routerLink]="['/', baseUrl, pagination.first_page]">
            <i class="fa fa-angle-double-left"></i>
        </a>
        <a *ngIf="pagination.current_page == pagination.first_page" 
           class="disabled btn btn-sm btn-secondary">
            <i class="fa fa-angle-double-left"></i>
        </a>
        
        <a *ngIf="pagination.current_page != pagination.pre_page" 
           class="btn btn-sm btn-secondary" [routerLink]="['/', baseUrl, pagination.pre_page]">
            <i class="fa fa-angle-left"></i>
        </a>
        <a *ngIf="pagination.current_page == pagination.pre_page" 
           class="disabled btn btn-sm btn-secondary">
            <i class="fa fa-angle-left"></i>
        </a>
        
        <a *ngIf="pagination.current_page != pagination.next_page" 
           class="btn btn-sm btn-secondary" [routerLink]="['/', baseUrl, pagination.next_page]">
            <i class="fa fa-angle-right"></i>
        </a>
        <a *ngIf="pagination.current_page == pagination.next_page" 
           class="disabled btn btn-sm btn-secondary" [routerLink]="['/', baseUrl, pagination.next_page]">
            <i class="fa fa-angle-right"></i>
        </a>
        
        <a *ngIf="pagination.current_page != pagination.last_page" 
           class="btn btn-sm btn-secondary" [routerLink]="['/', baseUrl, pagination.last_page]">
            <i class="fa fa-angle-double-right"></i>
        </a>
        <a *ngIf="pagination.current_page == pagination.last_page" 
           class="disabled btn btn-sm btn-secondary" [routerLink]="['/', baseUrl, pagination.last_page]">
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