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
        .switchMap(action => this.putTag(action.payload)
            .map(tag => CmsAttrActions.saveTagSuccess(tag))
            .catch(() => Observable.of(CmsAttrActions.saveFail())));

    @Effect() saveCat$ = this.actions$.ofType(CmsAttrActions.SAVE_CATEGORY)
        .switchMap(action => this.putCat(action.payload)
            .map(cat => CmsAttrActions.saveCategorySuccess(cat))
            .catch(() => Observable.of(CmsAttrActions.saveFail())));

    @Effect() addTag$ = this.actions$.ofType(CmsAttrActions.ADD_TAG)
        .switchMap(action => this.postTag(action.payload)
            .map(tag => CmsAttrActions.addTagSuccess(tag))
            .catch(() => Observable.of(CmsAttrActions.saveFail())));

    @Effect() addCat$ = this.actions$.ofType(CmsAttrActions.ADD_CATEGORY)
        .switchMap(action => this.postCat(action.payload)
            .map(cat => CmsAttrActions.addCategorySuccess(cat))
            .catch(() => Observable.of(CmsAttrActions.saveFail())));

    @Effect() deleteTag$ = this.actions$.ofType(CmsAttrActions.DELETE_TAG)
        .switchMap(action => this.deleteTag(action.payload)
            .map(tagId => CmsAttrActions.deleteTagSuccess(tagId))
            .catch(() => Observable.of(CmsAttrActions.saveFail())));

    @Effect() deleteCat$ = this.actions$.ofType(CmsAttrActions.DELETE_CATEGORY)
        .switchMap(action => this.deleteCat(action.payload)
            .map(catId => CmsAttrActions.deleteCategorySuccess(catId))
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
     * Update a tag
     */
    private putTag(tag: Tag) {
        return this.putTax(tag, AuthCache.API_PATH().cms_tags);
    }

    /**
     * Update a category
     */
    private putCat(cat: Category) {
        return this.putTax(cat, AuthCache.API_PATH().cms_cats);
    }

    /**
     * Update a tax
     */
    private putTax(tax: any, apiPath: string) {
        let body = JSON.stringify(tax);
        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API() + apiPath + '/' + tax.id;
        return this.http.put(api, body, options).map(res => res.json());
    }

    /**
     * Create a tag
     */
    private postTag(tag: Tag) {
        return this.postTax(tag, AuthCache.API_PATH().cms_tags);
    }

    /**
     * Create category
     */
    private postCat(cat: Category) {
        return this.postTax(cat, AuthCache.API_PATH().cms_cats);
    }

    /**
     * Create a tax
     */
    private postTax(tax: any, apiPath: string) {
        let body = JSON.stringify(tax);
        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API() + apiPath;
        return this.http.post(api, body, options).map(res => res.json());
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
