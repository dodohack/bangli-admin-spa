/**
 *
 */
import { Component } from "@angular/core";

@Component({
    selector: 'paginator',
    template:
    `
    <div class="float-right paginator">
        <a class="btn btn-sm btn-secondary" [routerLink]="['/posts', filter, condition, pagination.first_page]"><i class="fa fa-angle-double-left"></i></a>
        <a class="btn btn-sm btn-secondary" [routerLink]="['/posts', filter, condition, pagination.pre_page]"><i class="fa fa-angle-left"></i></a>
        <a class="btn btn-sm btn-secondary" [routerLink]="['/posts', filter, condition, pagination.next_page]"><i class="fa fa-angle-right"></i></a>
        <a class="btn btn-sm btn-secondary" [routerLink]="['/posts', filter, condition, pagination.last_page]"><i class="fa fa-angle-double-right"></i></a>
    </div>
        `
})
export class PaginatorComponent {

}