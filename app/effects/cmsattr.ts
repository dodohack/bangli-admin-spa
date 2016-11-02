/**
 * Load CMS attributes on app startup.
 */
import { Injectable }                    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Effect, Actions }               from '@ngrx/effects';
import { Observable }                    from 'rxjs/Observable';

import { CacheSingleton }   from './cache.singleton';
import { APIS, API_PATH }   from '../api';
import { CmsAttrsState }    from '../reducers/cmsattrs';
import { CmsAttrActions }   from '../actions';
import { Tag, Category }    from '../models';
import { TopicType }        from '../models';
import { GeoLocation }      from "../models";
import { ENTITY }           from '../models';

@Injectable()
export class CmsAttrEffects {
    
    cache = CacheSingleton.getInstance();

    constructor(private actions$: Actions,
                private http: Http) { }

    get headers() {
        return new Headers({
            'Authorization': 'Bearer' + this.cache.token,
            'Content-Type': 'application/json'
        });
    }

    @Effect() loadAll$ = this.actions$.ofType(CmsAttrActions.LOAD_ALL)
        .switchMap(action => this.getAll(action.payload)
            .map(attrs => CmsAttrActions.loadAllSuccess(attrs))
            .catch(() => Observable.of(CmsAttrActions.loadAllFail())));

    @Effect() sTopic$ = this.actions$.ofType(CmsAttrActions.SEARCH_TOPICS)
        .switchMap(action => this.searchTopics(action.payload.ttid, action.payload.text)
            .map(res => CmsAttrActions.searchTopicsSuccess(res.entities))
            .catch(() => Observable.of(CmsAttrActions.searchTopicsFail())));

    @Effect() saveTag$ = this.actions$.ofType(CmsAttrActions.SAVE_TAG)
        .switchMap(action => this.putTag(action.payload)
            .map(tag => CmsAttrActions.saveTagSuccess(tag))
            .catch(() => Observable.of(CmsAttrActions.saveFail())));

    @Effect() saveCat$ = this.actions$.ofType(CmsAttrActions.SAVE_CATEGORY)
        .switchMap(action => this.putCat(action.payload)
            .map(cat => CmsAttrActions.saveCategorySuccess(cat))
            .catch(() => Observable.of(CmsAttrActions.saveFail())));

    @Effect() saveTType$ = this.actions$.ofType(CmsAttrActions.SAVE_TOPIC_TYPE)
        .switchMap(action => this.putTopicType(action.payload)
            .map(ttype => CmsAttrActions.saveTopicTypeSuccess(ttype))
            .catch(() => Observable.of(CmsAttrActions.saveFail())));

    @Effect() saveGeoLoc$ = this.actions$.ofType(CmsAttrActions.SAVE_GEO_LOCATION)
        .switchMap(action => this.putGeoLoc(action.payload)
            .map(loc => CmsAttrActions.saveGeoLocationSuccess(loc))
            .catch(() => Observable.of(CmsAttrActions.saveFail())));

    @Effect() addTag$ = this.actions$.ofType(CmsAttrActions.ADD_TAG)
        .switchMap(action => this.postTag(action.payload)
            .map(tag => CmsAttrActions.addTagSuccess(tag))
            .catch(() => Observable.of(CmsAttrActions.saveFail())));

    @Effect() addTType$ = this.actions$.ofType(CmsAttrActions.ADD_TOPIC_TYPE)
        .switchMap(action => this.postTopicType(action.payload)
            .map(ttype => CmsAttrActions.addTopicTypeSuccess(ttype))
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

    @Effect() deleteTType$ = this.actions$.ofType(CmsAttrActions.DELETE_TOPIC_TYPE)
        .switchMap(action => this.deleteTopicType(action.payload)
            .map(ttypeId => CmsAttrActions.deleteTopicTypeSuccess(ttypeId))
            .catch(() => Observable.of(CmsAttrActions.saveFail())));

    @Effect() deleteGeoLoc$ = this.actions$.ofType(CmsAttrActions.DELETE_GEO_LOCATION)
        .switchMap(action => this.deleteGeoLoc(action.payload)
            .map(locId => CmsAttrActions.deleteGeoLocationSuccess(locId))
            .catch(() => Observable.of(CmsAttrActions.saveFail())));

    //////////////////////////////////////////////////////////////////////////
    // Private helper functions
    
    private getAll(key: string = undefined): Observable<CmsAttrsState> {
        // Cache the key for current session scope
        if (key) this.cache.key = key;
        
        let api = APIS[this.cache.key] + API_PATH.cms_attrs + 
            '?token=' + this.cache.token;
        return this.http.get(api).map(res => res.json());
    }

    /**
     * Search topics by topic type id and title/slug with current channel
     */
    private searchTopics(ttid: number, text: string) {
        // Return empty array if search string is empty
        if (!text || text == '') return Observable.throw(new Error('empty!'));

        let ttype = '';
        // If topic type id is given
        if (ttid) ttype = '&type=' + ttid;

        let api = APIS[this.cache.key] + API_PATH.cms_topics +
            '?etype=' + ENTITY.CMS_TOPIC + ttype +
            '&query=' + text + '&per_page=50' +
            '&columns=id,title,type_id' +
            '&relations=' +
            '&token=' + this.cache.token;

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
     * Update a topic type
     */
    private putTopicType(ttype: TopicType) {
        return this.putTax(ttype, API_PATH.cms_topic_types);
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

        let api = APIS[this.cache.key] + apiPath + '/' + tax.id;
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
     * Create topic type
     */
    private postTopicType(ttype: TopicType) {
        return this.postTax(ttype, API_PATH.cms_topic_types);
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

        let api = APIS[this.cache.key] + apiPath;
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
     * Delete a cms topic type
     */
    private deleteTopicType(ttype: TopicType) {
        return this.deleteTax(ttype, API_PATH.cms_topic_types);
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

        let api = APIS[this.cache.key] + apiPath + '/' + tax.id;
        return this.http.delete(api, options).map(res => res.json());
    }
}
