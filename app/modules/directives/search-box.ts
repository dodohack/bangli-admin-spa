/**
 * A common search component for all kind of list page
 */
import { Component, OnInit, Input, Output } from "@angular/core";
import { EventEmitter }              from '@angular/core';
import { FormControl }               from '@angular/forms';
import { ActivatedRoute }            from '@angular/router';
import { Router, NavigationExtras }  from '@angular/router';
// FIXME: Tried moving this to shared.module, but it reports duplicated declare
import { FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

@Component({
    selector: 'search-box',
    template: require('./search-box.html'),
    directives: [ FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES  ]
})
export class SearchBox implements OnInit {

    searchCtrl = new FormControl();
    searchText: string = '';

    @Input() loading: boolean;

    constructor(private route: ActivatedRoute,
                private router: Router) {}

    ngOnInit() {
        let qp = this.route.queryParams.subscribe(params => {
            this.searchText = params['query'] || '';
        });
        qp.unsubscribe();


        this.searchCtrl.valueChanges
            .debounceTime(500).subscribe(text => {
            let param: NavigationExtras = { queryParams: { 'query': text }};
            this.router.navigate(['/post/page/1/state/all'], param);
        });
    }
}
