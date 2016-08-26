/**
 * This is the component for page list page
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { AppState }          from '../../reducers';
import { PageActions }       from '../../actions';

import { zh_CN } from '../../localization';

@Component({
    template: require('./pages.page.html')
})
export class PagesPage implements OnInit
{
    /* Pages state in ngrx */
    pagesState$: Observable<any>;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {
        this.pagesState$ = this.store.select('pages');
    }


    ngOnInit() {
        /* TODO: Get status/editor from url as well */
        this.route.params.subscribe(params => {
            let cur_page = params['page'] ? params['page'] : '1';
            this.store.dispatch(PageActions.loadPages({cur_page: cur_page}));
        });
    }
}
