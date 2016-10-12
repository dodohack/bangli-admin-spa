/**
 * Load CMS attributes on app startup.
 */
import { Injectable }                    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Effect, Actions }               from '@ngrx/effects';
import { Observable }                    from 'rxjs/Observable';

import { BaseEffects }      from './effect.base';
import { APIS, API_PATH }   from '../api';
import { CmsAttrsState }    from '../reducers/cmsattrs';
import { CmsAttrActions }   from '../actions';
import { Tag, Category }    from '../models';
import { GeoLocation }      from "../models";

@Injectable()
export class CmsAttrEffects extends BaseEffects {

    constructor(private actions$: Actions,
                private http: Http) {
        super();
    }

    @Effect() loadAll$ = this.actions$.ofType(CmsAttrActions.LOAD_ALL)
        .switchMap(() => this.getAll()
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

    @Effect() saveGeoLoc$ = this.actions$.ofType(CmsAttrActions.SAVE_GEO_LOCATION)
        .switchMap(action => this.putGeoLoc(action.payload)
            .map(loc => CmsAttrActions.saveGeoLocationSuccess(loc))
            .catch(() => Observable.of(CmsAttrActions.saveFail())));

    @Effect() addTag$ = this.actions$.ofType(CmsAttrActions.ADD_TAG)
        .switchMap(action => this.postTag(action.payload)
            .map(tag => CmsAttrActions.addTagSuccess(tag))
            .catch(() => Observable.of(CmsAttrActions.saveFail())));

    @Effect() addCat$ = this.actions$.ofType(CmsAttrActions.ADD_CATEGORY)
        .switchMap(action => this.postCat(action.payload)
            .map(cat => CmsAttrActions.addCategorySuccess(cat))
            .catch(() => Observable.of(CmsAttrActions.saveFail())));

    @Effect() addGeoLoc$ = this.actions$.ofType(CmsAttrActions.ADD_GEO_LOCATION)
        .switchMap(action => this.postGeoLoc(action.payload)
            .map(loc => CmsAttrActions.addGeoLocationSuccess(loc))
            .catch(() => Observable.of(CmsAttrActions.saveFail())));

    @Effect() deleteTag$ = this.actions$.ofType(CmsAttrActions.DELETE_TAG)
        .switchMap(action => this.deleteTag(action.payload)
            .map(tagId => CmsAttrActions.deleteTagSuccess(tagId))
            .catch(() => Observable.of(CmsAttrActions.saveFail())));

    @Effect() deleteCat$ = this.actions$.ofType(CmsAttrActions.DELETE_CATEGORY)
        .switchMap(action => this.deleteCat(action.payload)
            .map(catId => CmsAttrActions.deleteCategorySuccess(catId))
            .catch(() => Observable.of(CmsAttrActions.saveFail())));

    @Effect() deleteGeoLoc$ = this.actions$.ofType(CmsAttrActions.DELETE_GEO_LOCATION)
        .switchMap(action => this.deleteGeoLoc(action.payload)
            .map(locId => CmsAttrActions.deleteGeoLocationSuccess(locId))
            .catch(() => Observable.of(CmsAttrActions.saveFail())));

    //////////////////////////////////////////////////////////////////////////
    // Private helper functions
    
    private getAll(): Observable<CmsAttrsState> {
        let api = APIS[this.key] + API_PATH.cms_attrs + '?token=' + this.token;
        //console.log("***CMS_ATTRS API: ", api);
        return this.http.get(api).map(res => res.json());
    }

    /**
     * Update a tag
     */
    private putTag(tag: Tag) {
        return this.putTax(tag, API_PATH.cms_tags);
    }

    /**
     * Update a category
     */
    private putCat(cat: Category) {
        return this.putTax(cat, API_PATH.cms_cats);
    }

    /**
     * Update a geo-location
     */
    private putGeoLoc(loc: GeoLocation) {
        return this.putTax(loc, API_PATH.geo_locations);
    }

    /**
     * Update a tax
     */
    private putTax(tax: any, apiPath: string) {
        let body = JSON.stringify(tax);
        let options = new RequestOptions({ headers: this.headers });

        let api = APIS[this.key] + apiPath + '/' + tax.id;
        return this.http.put(api, body, options).map(res => res.json());
    }

    /**
     * Create a tag
     */
    private postTag(tag: Tag) {
        return this.postTax(tag, API_PATH.cms_tags);
    }

    /**
     * Create category
     */
    private postCat(cat: Category) {
        return this.postTax(cat, API_PATH.cms_cats);
    }

    /**
     * Create geo-location
     */
    private postGeoLoc(loc: GeoLocation) {
        return this.postTax(loc, API_PATH.geo_locations);
    }

    /**
     * Create a tax
     */
    private postTax(tax: any, apiPath: string) {
        let body = JSON.stringify(tax);
        let options = new RequestOptions({ headers: this.headers });

        let api = APIS[this.key] + apiPath;
        return this.http.post(api, body, options).map(res => res.json());
    }

    /**
     * Delete a cms tag
     */
    private deleteTag(tag: Tag) {
        return this.deleteTax(tag, API_PATH.cms_tags);
    }

    /**
     * Delete a cms category
     */
    private deleteCat(cat: Category) {
        return this.deleteTax(cat, API_PATH.cms_cats);
    }

    /**
     * Delete a geo-location
     */
    private deleteGeoLoc(loc: GeoLocation) {
        return this.deleteTax(loc, API_PATH.geo_locations);
    }

    /**
     * Common: delete a tax
     */
    private deleteTax(tax: any, apiPath: string) {
        let options = new RequestOptions({ headers: this.headers });

        let api = APIS[this.key] + apiPath + '/' + tax.id;
        return this.http.delete(api, options).map(res => res.json());
    }
}
