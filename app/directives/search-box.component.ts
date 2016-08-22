/**
 * A common search component for all kind of list page
 */
import { Component, Input, Output } from "@angular/core";
import { FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl } from '@angular/forms';
import { TYPEAHEAD_DIRECTIVES } from 'ng2-bootstrap';

@Component({
    selector: 'search-box',
    template:
    `
    <form class="form-inline pull-xs-right" [formGroup]="searchForm">
        <div class="input-group">
            <input 
            class="form-control input-sm" 
            placeholder="搜索"
            formControlName="search"
            [typeahead]="searchPrompt"
            (typeaheadLoading)="changeTypeaheadLoading($event)"
            (typeaheadOnSelect)="onSelect($event)"
            [typeaheadOptionsLimit]="10"
            [typeaheadWaitMs]="300"
            [typeaheadOptionField]="'query'">
            <span class="input-group-addon">
                <i class="fa fa-search fa-fw" *ngIf="typeaheadLoading !== true"></i>
                <i class="fa fa-spinner fa-spin fa-fw" *ngIf="typeaheadLoading === true"></i>
            </span>
        </div>
    </form>
    `,
    directives: [ TYPEAHEAD_DIRECTIVES, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES  ]
})
export class SearchBoxComponent {

    /* Copied from ng2-bootstrap example*/
    searchCtrl: FormControl = new FormControl();
    searchForm: FormGroup = new FormGroup({
        search: this.searchCtrl
    });

    typeaheadLoading: boolean = false;


    public searchPrompt:Array<string> = ['Alabama', 'Alaska', 'Arizona', 'Arkansas',
        'California', 'Colorado',
        'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa',
        'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
        'Michigan', 'Minnesota',
        'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
        'New Jersey', 'New Mexico',
        'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon',
        'Pennsylvania', 'Rhode Island',
        'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
        'Virginia', 'Washington',
        'West Virginia', 'Wisconsin', 'Wyoming'];

    constructor() {

    }

    onSelect(e: any): void {
        console.log('Selected value: ', e);
    }

    changeTypeaheadLoading(e: boolean) {
        this.typeaheadLoading = e;
    }
}