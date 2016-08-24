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

    constructor (private actions$: Actions,
                 private http: Http) {}

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
     * Save single page/multiple pages
     */
    private save(pages: Page[]): Observable<Page[]> {
        let api = '';
        let body = JSON.stringify(pages);

        let headers = new Headers({
            'Authorization': AuthCache.token(),
            'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this.http.post(api, body, options).map(res => res.json());
    }

    private getPages(filters: any): Observable<any> {
        let cur_page = filters.cur_page;
        //let status   = filters.status;
        let api = AuthCache.API().pages + '/' + cur_page +
            '?per_page=' + PrefCache.getPerPage() +
            //'&status=' + status +
            '&token=' + AuthCache.token();
        return this.http.get(api).map(res => res.json());
    }


    private getPage(id: string): Observable<Page> {
        let api = AuthCache.API().page + '/' + id + '?token=' + AuthCache.token();
        return this.http.get(api).map(res => res.json());
    }
}