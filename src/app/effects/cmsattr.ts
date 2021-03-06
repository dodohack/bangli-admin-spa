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
import { Tag, Category }    from '../models';
import { TopicType }        from '../models';
import { GeoLocation }      from "../models";
import { ENTITY }           from '../models';

import * as cms   from '../actions/cmsattr';
import * as alert from '../actions/alert';

@Injectable()
export class CmsAttrEffects {
    
    cache = CacheSingleton.getInstance();

    constructor(private actions$: Actions,
                private http: Http) { }

    get headers() {
        return new Headers({
            'Authorization': 'Bearer ' + this.cache.token,
            'Content-Type': 'application/json'
        });
    }

    //
    // FIXME: it is too heavy to trigger cms.LoadAll after every modification,
    // Will remove LoadAll and do individually update in cmsattr reducer.
    //

    @Effect() loadAll$ = this.actions$.ofType(cms.LOAD_ALL)
        .switchMap((action: any) => this.getAll(action.payload)
            .map(attrs => new cms.LoadAllSuccess(attrs))
            .catch(() => Observable.of(new cms.LoadAllFail())));

    @Effect() loadPostStatus$ = this.actions$.ofType(cms.LOAD_ENTITY_STATUS)
        .switchMap((action: any) => this.getEntityStatus(action.payload.etype)
            .map(attrs => new cms.LoadEntityStatusSuccess({etype: attrs.etype, data: attrs.status}))
            .catch((ret) => Observable.of(new cms.LoadEntityStatusFail(ret))));

    @Effect() sTopic$ = this.actions$.ofType(cms.SEARCH_TOPICS)
        .switchMap((action: any) => this.searchTopics(action.payload.ttid, action.payload.text)
            .map(res => new cms.SearchTopicsSuccess(res.entities))
            .catch(() => Observable.of(new cms.SearchTopicsFail())));

    @Effect() saveTag$ = this.actions$.ofType(cms.SAVE_TAG)
        .switchMap((action: any) => this.putTag(action.payload)
            .mergeMap(tag => [
                new cms.SaveTagSuccess(tag),
                new cms.LoadAll()
            ])
            .catch(() => Observable.of(new cms.SaveFail())));

    @Effect() saveCat$ = this.actions$.ofType(cms.SAVE_CATEGORY)
        .switchMap((action: any) => this.putCat(action.payload)
            .mergeMap(cat => [
                new cms.SaveCategorySuccess(cat),
                new cms.LoadAll()
            ])
            .catch(() => Observable.of(new cms.SaveFail())));

    @Effect() saveTType$ = this.actions$.ofType(cms.SAVE_TOPIC_TYPE)
        .switchMap((action: any) => this.putTopicType(action.payload)
            .mergeMap(ttype => [
                new cms.SaveTopicTypeSuccess(ttype),
                new cms.LoadAll()
            ])
            .catch(() => Observable.of(new cms.SaveFail())));

    @Effect() saveGeoLoc$ = this.actions$.ofType(cms.SAVE_GEO_LOCATION)
        .switchMap((action: any) => this.putGeoLoc(action.payload)
            .mergeMap(loc => [
                new cms.SaveGeoLocationSuccess(loc),
                new cms.LoadAll()
            ])
            .catch(() => Observable.of(new cms.SaveFail())));

    @Effect() addTag$ = this.actions$.ofType(cms.ADD_TAG)
        .switchMap((action: any) => this.postTag(action.payload)
            .mergeMap(tag => [
                new cms.AddTagSuccess(tag),
                new cms.LoadAll()
            ])
            .catch(() => Observable.of(new cms.SaveFail())));

    @Effect() addTType$ = this.actions$.ofType(cms.ADD_TOPIC_TYPE)
        .switchMap((action: any) => this.postTopicType(action.payload)
            .mergeMap(ttype => [
                new cms.AddTopicTypeSuccess(ttype),
                new cms.LoadAll()
            ])
            .catch(() => Observable.of(new cms.SaveFail())));

    @Effect() addCat$ = this.actions$.ofType(cms.ADD_CATEGORY)
        .switchMap((action: any) => this.postCat(action.payload)
            .mergeMap(cat => [
                new cms.AddCategorySuccess(cat),
                new cms.LoadAll()
            ])
            .catch(() => Observable.of(new cms.SaveFail())));

    @Effect() addGeoLoc$ = this.actions$.ofType(cms.ADD_GEO_LOCATION)
        .switchMap((action: any) => this.postGeoLoc(action.payload)
            .mergeMap(loc => [
                new cms.AddGeoLocationSuccess(loc),
                new cms.LoadAll()
            ])
            .catch(() => Observable.of(new cms.SaveFail())));

    @Effect() deleteTag$ = this.actions$.ofType(cms.DELETE_TAG)
        .switchMap((action: any) => this.deleteTag(action.payload)
            .mergeMap(ret => [
                new cms.DeleteTagSuccess(ret.id),
                new cms.LoadAll()
            ])
            .catch(() => Observable.of(new cms.SaveFail())));

    @Effect() deleteCat$ = this.actions$.ofType(cms.DELETE_CATEGORY)
        .switchMap((action: any) => this.deleteCat(action.payload)
            .mergeMap(ret=> [
                new cms.DeleteCategorySuccess(ret.id),
                new cms.LoadAll()
            ])
            .catch(() => Observable.of(new cms.SaveFail())));

    @Effect() deleteTType$ = this.actions$.ofType(cms.DELETE_TOPIC_TYPE)
        .switchMap((action: any) => this.deleteTopicType(action.payload)
            .mergeMap(ret => [
                new cms.DeleteTopicTypeSuccess(ret.id),
                new cms.LoadAll()
            ])
            .catch(() => Observable.of(new cms.SaveFail())));

    @Effect() deleteGeoLoc$ = this.actions$.ofType(cms.DELETE_GEO_LOCATION)
        .switchMap((action: any) => this.deleteGeoLoc(action.payload)
            .mergeMap(ret => [
                new cms.DeleteGeoLocationSuccess(ret.id),
                new cms.LoadAll()
            ])
            .catch(() => Observable.of(new cms.SaveFail())));

    @Effect() saveFail$ = this.actions$.ofType(cms.SAVE_FAIL)
        .map((action: any) => new alert.Error('Save fail'));


    //////////////////////////////////////////////////////////////////////////
    // Private helper functions

    /**
     * Get all cms attributes, a very big array of attributes
     * @param key
     * @returns {any}
     */
    private getAll(key: string = undefined): Observable<CmsAttrsState> {
        // Cache the key for current session scope
        if (key) this.cache.key = key;
        
        let api = APIS[this.cache.key] + API_PATH.cms_attrs + 
            '?token=' + this.cache.token;
        return this.http.get(api).map(res => res.json());
    }

    /**
     * Get a summary of entity status, this is usually called when entity
     * status changes, say, delete an entity.
     * @param etype
     */
    private getEntityStatus(etype: string) {
        let api = APIS[this.cache.key] + this.getEntityStatusPath(etype) +
               '?etype=' + etype + '&token=' + this.cache.token;
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
            '?etype=' + ENTITY.TOPIC + ttype +
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

    /**
     * Return the entity status api path
     * @param etype
     */
    private getEntityStatusPath(etype: string) {
        switch (etype) {
            case ENTITY.POST: return API_PATH.cms_posts_status;
            case ENTITY.PAGE: return API_PATH.cms_pages_status;
            case ENTITY.TOPIC: return API_PATH.cms_topics_status;
            case ENTITY.OFFER: return API_PATH.cms_offers_status;
            case ENTITY.ADVERTISE: return API_PATH.advertises_status;
            case ENTITY.COMMENT: return API_PATH.comments_status;
            default:
                console.error("undefined api path for etype: ", etype);
                return '';
        }
    }
}
