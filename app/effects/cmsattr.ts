/**
 * Load CMS attributes on app startup.
 */
import { Injectable }                    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Effect, Actions }               from '@ngrx/effects';
import { Observable }                    from 'rxjs/Observable';

import { APIS, API_PATH }   from '../api';
import { AuthCache }        from '../auth.cache';
import { AuthState }        from '../reducers/auth';
import { CmsAttrsState }    from '../reducers/cmsattrs';
import { CmsAttrActions }   from '../actions';
import { Tag, Category }    from '../models';

@Injectable()
export class CmsAttrEffects {
    constructor(private actions$: Actions,
                private http: Http) { }

    get headers() {
        return new Headers({
            'Authorization': 'Bearer' + AuthCache.token(),
            'Content-Type': 'application/json'});
    }
    
    @Effect() loadAll$ = this.actions$.ofType(CmsAttrActions.LOAD_ALL)
        .switchMap(action => this.getAll(action.payload)
            .map(attrs => CmsAttrActions.loadAllSuccess(attrs))
            .catch(() => Observable.of(CmsAttrActions.loadAllFail())));

    @Effect() saveTag$ = this.actions$.ofType(CmsAttrActions.SAVE_TAG)
        .switchMap(action => this.saveTag(action.payload)
            .map(() => CmsAttrActions.saveSuccess())
            .catch(() => Observable.of(CmsAttrActions.saveFail())));

    @Effect() saveCat$ = this.actions$.ofType(CmsAttrActions.SAVE_CATEGORY)
        .switchMap(action => this.saveCat(action.payload)
            .map(() => CmsAttrActions.saveSuccess())
            .catch(() => Observable.of(CmsAttrActions.saveFail())));

    @Effect() deleteTag$ = this.actions$.ofType(CmsAttrActions.DELETE_TAG)
        .switchMap(action => this.deleteTag(action.payload)
            .map(() => CmsAttrActions.saveSuccess())
            .catch(() => Observable.of(CmsAttrActions.saveFail())));

    @Effect() deleteCat$ = this.actions$.ofType(CmsAttrActions.DELETE_CATEGORY)
        .switchMap(action => this.deleteCat(action.payload)
            .map(() => CmsAttrActions.saveSuccess())
            .catch(() => Observable.of(CmsAttrActions.saveFail())));


    //////////////////////////////////////////////////////////////////////////
    // Private helper functions
    
    private getAll(auth: AuthState): Observable<CmsAttrsState> {

        let api = APIS[auth.key] + API_PATH[auth.key].cms_attrs +
            '?token=' + auth.token;
        //console.log("***CMS_ATTRS API: ", api);
        return this.http.get(api).map(res => res.json());
    }

    /**
     * Create/Update a tag
     */
    private saveTag(tag: Tag) {
        return this.saveTax(tag, AuthCache.API_PATH().cms_tags);
    }

    /**
     * Create/Update a category
     */
    private saveCat(cat: Category) {
        return this.saveTax(cat, AuthCache.API_PATH().cms_cats);
    }

    /**
     * Create/Update a tax
     */
    private saveTax(tax: any, apiPath: string) {
        let body = JSON.stringify(tax);
        let options = new RequestOptions({ headers: this.headers });

        if (tax.id && tax.id !== 0) {
            // Update an existing tag
            let api = AuthCache.API() + apiPath + '/' + tax.id;
            return this.http.put(api, body, options).map(res => res.json());
        } else {
            // Create a new tag
            let api = AuthCache.API() + apiPath;
            return this.http.post(api, body, options).map(res => res.json());
        }
    }

    /**
     * Delete a cms tag
     */
    private deleteTag(tag: Tag) {
        return this.deleteTax(tag, AuthCache.API_PATH().cms_tags);
    }

    /**
     * Delete a cms category
     */
    private deleteCat(cat: Category) {
        return this.deleteTax(cat, AuthCache.API_PATH().cms_cats);
    }

    /**
     * Common: delete a tax
     */
    private deleteTax(tax: any, apiPath: string) {
        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API() + apiPath + '/' + tax.id;
        return this.http.delete(api, options).map(res => res.json());
    }
}
