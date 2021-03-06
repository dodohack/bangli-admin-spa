/**
 * A common search component for all kind of list page
 */
import { Component, OnInit, Input, Output } from "@angular/core";
import { EventEmitter }              from '@angular/core';
import { FormControl }               from '@angular/forms';
import { ActivatedRoute }            from '@angular/router';
import { Router, NavigationExtras }  from '@angular/router';

@Component({
    selector: 'search-box',
    templateUrl: './search-box.html'
})
export class SearchBox implements OnInit {

    searchCtrl = new FormControl();
    searchText: string = '';

    @Input() slug: string;
    @Input() loading: boolean;
    // Do not update url when this is set, usually this is used in image search
    // in a popup modal.
    @Input() noredirect: boolean;

    @Output() searchImages = new EventEmitter();

    constructor(private route: ActivatedRoute,
                private router: Router) {}

    ngOnInit() {
        let qp = this.route.queryParams.subscribe(params => {
            this.searchText = params['query'] || '';
        });
        qp.unsubscribe();


        this.searchCtrl.valueChanges
            .debounceTime(500).subscribe(text => {
            if (this.noredirect) {
                this.searchImages.emit(text);
            } else {
                let param: NavigationExtras = {queryParams: {'query': text}};
                this.router.navigate(['/', this.slug], param);
            }
        });
    }
}
