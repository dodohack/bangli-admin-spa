/**
 * This is the component for page list page
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { AppState }          from '../../reducers';
import { PageActions }       from '../../actions';
import { Page, PageParams }  from '../../models';

import { zh_CN } from '../../localization';

@Component({
    template: require('./pages.page.html')
})
export class PagesPage implements OnInit
{
    subParams: any;
    subQueryParams: any;

    /* Pages state in ngrx */
    pagesState$: Observable<any>;

    params: any;
    queryParams: any;

    // Is list is in loading state
    loading: boolean;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {
        this.pagesState$ = this.store.select('pages');
    }


    ngOnInit() {
        // FIXME: See fixme in posts.page.ts
        this.subParams = this.route.params.subscribe(params => {
            this.params = params;
            this.loading = true;
            this.loadPages();
        });
        this.subQueryParams = this.route.queryParams.subscribe(params => {
            this.queryParams = params;
            this.loading = true;
            this.loadPages();
        })
    }

    loadPages() {
        let pageParams: PageParams = new PageParams;

        // Must have parameters come from route.params observable
        if (this.params) {
            pageParams.cur_page = this.params['page'];
            pageParams.state    = this.params['state'];
        }

        // Optional parameters come from route.queryParams observable
        if (this.queryParams) {
            pageParams.editor   = this.queryParams['editor'];
            pageParams.query    = this.queryParams['query'];
        }

        // Load list of posts from API server
        this.store.dispatch(PageActions.loadPages(pageParams));
    }
}
