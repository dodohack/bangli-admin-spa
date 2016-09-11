/**
 * This is the component for page list page
 */

import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';



import { AppState }          from '../../reducers';
import { Ping }              from '../../ping';
import { AuthState }         from '../../reducers/auth';
import { CmsAttrsState }     from '../../reducers/cmsattrs';
import { PagesState }        from '../../reducers/pages';
import { PageActions }       from '../../actions';
import { Page, PageParams }  from '../../models';


import { zh_CN } from '../../localization';

@Component({ template: require('./pages.page.html') })
export class PagesPage implements OnInit, OnDestroy
{
    // All subscribers, needs to unsubscribe on destroy
    subAuth: any;
    subCms: any;
    subPages: any;
    subActivityOn: any;
    subActivityOff: any;
    subParams: any;
    subQueryParams: any;

    authState:   AuthState;
    cmsState:    CmsAttrsState;
    pagesState:  PagesState;

    // Batch editing pages
    pagesInEdit: Page[];

    params: any;
    queryParams: any;

    // Is list is in loading state
    loading: boolean;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) { }


    ngOnInit() {
        this.subAuth = this.store.select<AuthState>('auth')
            .subscribe(authState => this.authState = authState);
        /* TODO: Check if there are multiple network request between
         * posts/topics pages */
        this.subCms = this.store.select<CmsAttrsState>('cms')
            .subscribe(cmsState => this.cmsState = cmsState);
        this.subPages = this.store.select<PagesState>('pages')
            .subscribe(pagesState => {
                this.loading = false;
                this.pagesState = pagesState;
                // Create new copies of pages
                this.pagesInEdit = this.pagesState.editing
                    .map(id => Object.assign({}, this.pagesState.entities[id]));
            });

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

    ngOnDestroy() {
        this.subAuth.unsubscribe();
        this.subCms.unsubscribe();
        this.subPages.unsubscribe();
        this.subParams.unsubscribe();
        this.subQueryParams.unsubscribe();
    }

    get zh() { return zh_CN.cms; }

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

    // In page edit single or multiple topics
    batchEdit(ids: number[]) {
        this.store.dispatch(PageActions.batchEditPages(ids));
    }

    // FIXME: Should be Cancel batch options
    cancelBatchEdit() {
        this.store.dispatch(PageActions.cancelBatchEditPages());
    }

    // Edit previous post in current pages list
    editPreviousPage() {
        this.store.dispatch(PageActions.batchEditPreviousPage());
    }

    // Edit next post in current pages list
    editNextPage() {
        this.store.dispatch(PageActions.batchEditNextPage());
    }

    // Delete multiple pages
    batchDelete(ids: number[]) {
        this.store.dispatch(PageActions.batchDeletePages(ids));
    }

    // Lock pages to offline edit
    batchOfflineEdit(ids: number[]) {
        this.store.dispatch(PageActions.batchOfflineEditPages(ids));
    }

    // Add lock to pages, so no one can edit the page
    batchLock(ids: number[]) {
        this.store.dispatch(PageActions.batchLockPages(ids));
    }

    // TODO:
    canDeactivate() {
        return true;
    }
}
