/**
 * List page paginator
 */
import { Component, Input } from "@angular/core";
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'paginator',
    template: require('./paginator.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Paginator {
    
    @Input() base: string;

    @Input() lists: any;

    get paginator() { return this.lists.paginator; }

    /**
     * We can loop over the array returned by this function to greatly simplify
     * the html template, this 4 elements represent the state and style of
     * 'first', 'previous', 'next' and 'last' pages.
     */
    get paginators() {
        return [
            {index: 1, icon: 'fa-angle-double-left', disabled: this.paginator.cur_page === 1},
            {index: this.paginator.pre_page, icon: 'fa-angle-left', disabled: this.paginator.cur_page === this.paginator.pre_page},
            {index: this.paginator.next_page, icon: 'fa-angle-right', disabled: this.paginator.cur_page === this.paginator.next_page},
            {index: this.paginator.last_page, icon: 'fa-angle-double-right', disabled: this.paginator.cur_page === this.paginator.last_page},
        ];
    }
}
