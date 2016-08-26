/**
 * Page[s] side effects
 */
import { Injectable }                     from '@angular/core';
import { Http, Headers, RequestOptions }  from '@angular/http';
import { Effect, Actions }                from '@ngrx/effects';
import { Observable }                     from 'rxjs/Observable';

import { AuthCache }       from '../auth.cache';
import { PrefCache }       from '../pref.cache';
import { PageActions }  from '../actions';
import { Page }         from "../models";

@Injectable()
export class PageEffects {

    /* Common http options*/
    headers: Headers;

    constructor (private actions$: Actions,
                 private http: Http) {
        this.headers = new Headers({
            'Authorization': 'Bearer ' + AuthCache.token(),
            'Content-Type': 'application/json'});
    }

    @Effect() loadPages$ = this.actions$.ofType(PageActions.LOAD_PAGES)
        .switchMap(action => this.getPages(action.payload))
        .map(pages => PageActions.loadPagesSuccess(pages))
        .catch(() => Observable.of(PageActions.loadPagesFail()));

    @Effect() loadPage$ = this.actions$.ofType(PageActions.LOAD_PAGE)
        .switchMap(action => this.getPage(action.payload))
        .map(page => PageActions.loadPageSuccess(page))
        .catch(() => Observable.of(PageActions.loadPageFail()));

    //////////////////////////////////////////////////////////////////////////
    // Private helper functions


    /**
     * Get single page
     */
    private getPage(id: number): Observable<Page> {
        let api = AuthCache.API().cms_pages +
            '/' + id + '?token=' + AuthCache.token();
        return this.http.get(api).map(res => res.json());
    }

    /**
     * Update single page
     */
    private putPage(page: Page): Observable<Page> {
        let body = JSON.stringify(page);

        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API().cms_pages + '/' + page.id;
        return this.http.put(api, body, options).map(res => res.json());
    }

    /**
     * Create a new page
     */
    private postPage(page: Page): Observable<Page> {
        let body = JSON.stringify(page);

        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API().cms_pages + '/' + page.id;
        return this.http.post(api, body, options).map(res => res.json());
    }

    /**
     * Delete a page
     */
    private deletePage(page: Page): Observable<Page> {
        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API().cms_pages + '/' + page.id;
        return this.http.delete(api, options).map(res => res.json());
    }

    /**
     * Get pages
     */
    private getPages(filters: any): Observable<any> {
        let cur_page = filters.cur_page;
        let status   = filters.status;
        let api = AuthCache.API().cms_pages +
            '?page=' + cur_page +
            '&per_page=' + PrefCache.getPerPage() +
            '&status=' + status +
            '&token=' + AuthCache.token();
        return this.http.get(api).map(res => res.json());
    }

    /**
     * Update pages
     */
    private putPages(pages: Page[]): Observable<Page[]> {
        let body = JSON.stringify(pages);

        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API().cms_pages_batch;
        return this.http.put(api, body, options).map(res => res.json());
    }

    /**
     * Delete pages
     */
    private deletePages(pages: Page[]): Observable<Page[]> {
        let body = JSON.stringify(pages);

        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API().cms_pages_batch;
        // TODO: http.delete can't have a body
        //return this.http.delete(api, options).map(res => res.json());
    }
}