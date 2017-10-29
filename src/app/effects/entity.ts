/**
 * Side effects for entities listed below:
 * post, topic, page, offer, newsletter, etc
 */
import { Injectable }                from '@angular/core';
import { Http, Headers, RequestOptions }  from '@angular/http';
import { Effect, Actions }           from '@ngrx/effects';
import { Observable }                from 'rxjs/Observable';

import { CacheSingleton }  from './cache.singleton';
import { APIS, API_PATH }  from '../api';
import { ENTITY }          from '../models';
import { EntityParams }    from '../models';

import * as entity   from '../actions/entity';
import * as cms      from '../actions/cmsattr';
import * as alert    from '../actions/alert';


@Injectable()
export class EntityEffects {
    cache = CacheSingleton.getInstance();
    
    constructor (private actions$: Actions,
                 private http: Http) { }


    get headers() {
        return new Headers({
            'Authorization': 'Bearer ' + this.cache.token,
            'Content-Type': 'application/json'
        });
    }


    /**************************************************************************
     * Entity
     *************************************************************************/
    @Effect() loadEntities$ = this.actions$.ofType(entity.LOAD_ENTITIES)
        .switchMap((action: any) => this.getEntities(action.payload.etype, action.payload.data)
            .map(ret => new entity.LoadEntitiesSuccess({etype: ret.etype, data: ret}))
            .catch((ret) => Observable.of(new entity.LoadEntitiesFail({etype: ret.etype, data: ret.error})))
        );

    @Effect() loadEntitiesOnScroll$ = this.actions$.ofType(entity.LOAD_ENTITIES_ON_SCROLL)
        .switchMap((action: any) => this.getEntities(action.payload.etype, action.payload.data)
            .map(ret => new entity.LoadEntitiesOnScrollSuccess({etype: ret.etype, data: ret}))
            .catch((ret) => Observable.of(new entity.LoadEntitiesOnScrollFail({etype: ret.etype, data: ret.error})))
        );

    @Effect() loadEntity$ = this.actions$.ofType(entity.LOAD_ENTITY)
        .switchMap((action: any) => this.getEntity(action.payload.etype, action.payload.data)
            .map(ret => new entity.LoadEntitySuccess({etype: ret.etype, data: ret.entity, prepend: false}))
            .catch((ret) => Observable.of(new entity.LoadEntityFail({etype: ret.etype, data: ret.error})))
        );

    @Effect() saveEntity$ = this.actions$.ofType(entity.SAVE_ENTITY)
        .map((action: any) => action.payload)
        .switchMap(p =>
            this.saveEntity(p.etype, p.data, p.mask).mergeMap(ret => {
                console.error("FIXME: Think a better way, not always deleting id 0 entity!");
                return [
                    // Delete draft(id=0) entity when save is succeed
                    new entity.DeleteEntity({etype: ret.etype, data: 0}),
                    new entity.SaveEntitySuccess({etype: ret.etype, data: ret.entity}),
                    new alert.Info('保存成功: ' + ret.entity.id)
                ];
            })
            .catch((ret) => Observable.of(new entity.SaveEntityFail({etype: ret.etype, data: ret.error})))
        );

    @Effect() deleteEntity$ = this.actions$.ofType(entity.DELETE_ENTITY)
        .map((action: any) => action.payload)
        .filter(p => p.data) // Do not send delete action for id 0 entity
        .switchMap(p => this.deleteEntity(p.etype, p.data)
            // API server response: {etype: ..., data: {id: ..., status: ...}}
            .mergeMap(ret => {
                return [
                    new entity.DeleteEntitySuccess({etype: ret.etype, data: {id: ret.id, status: ret.status}}),
                    new alert.Info('删除成功: ' + ret.id + ', status: ' + ret.status),
                    new cms.LoadEntityStatus({etype: ret.etype})
                ];
            })
            .catch((ret) => Observable.of(
                new alert.Error('Fail to delete ' + ret.etype + ', error: ' + ret.error)))
        );

    @Effect() batchDeleteEntities$ = this.actions$.ofType(entity.BATCH_DELETE_ENTITIES)
        .map((action: any) => action.payload)
        .switchMap(p => this.deleteEntities(p.etype, p.data)
            .mergeMap(ret => {
                if (Array.isArray(ret.entities)) {
                    // Dispatch individual DELETE_ENTITY_SUCCESS actions
                    let actions = [];
                    for (let i = 0; i < ret.entities.length; i++) {
                        actions.push(new entity.DeleteEntitySuccess({etype: ret.etype, data: ret.entities[i]}));
                    }
                    actions.push(new alert.Info('Delete ' + ret.entities.length + ' ' + ret.etype + 's success'));
                    actions.push(new cms.LoadEntityStatus({etype: ret.etype}));
                    return Observable.from(actions);
                }
            })
            .catch((ret) => Observable.of(new alert.Error('Delete ' + ret.etype + 's fail'))));

    @Effect() autoSave$ = this.actions$.ofType(entity.AUTO_SAVE)
        .map((action: any) => action.payload)
        .switchMap(p => this.autoSaveEntity(p.etype, p.data, p.mask)
            .mergeMap(ret => {
                return [
                    new entity.AutoSaveSuccess({etype: ret.etype, data: ret.entity}),
                    new alert.Info('自动保存成功: ' + ret.entity.id)
                ];
            })
            .catch((ret) => Observable.of(new entity.SaveEntityFail({etype: ret.etype, data: ret.error})))
        );

    @Effect() genThumbs$ = this.actions$.ofType(entity.GENERATE_THUMBS)
        .map((action: any) => action.payload)
        .switchMap(p => this.genThumbnails(p.etype, p.data)
            .mergeMap(ret => {
                return [
                    new entity.GenerateThumbsSuccess({etype: ret.etype, data: null}),
                    new alert.Info('Thumbnail generation finished(total: '
                        + ret.total + ', ok: ' + ret.ok
                        + ', fail: ' + ret.fail + ')')
                ];
            })
            .catch((ret) => Observable.of(new entity.GenerateThumbsFail({etype: ret.etype, data: ret.error})))
        );


    /*************************************************************************
     * Popup message etc
     *************************************************************************/
    @Effect() saveEntityFail$ = this.actions$.ofType(entity.SAVE_ENTITY_FAIL)
        .map((action: any) => new alert.Error('Fail to save ' + action.etype + ', error: ' + action.data));

    @Effect() loadEntityFail$ = this.actions$.ofType(entity.LOAD_ENTITY_FAIL)
        .map((action: any) => new alert.Error('Fail to load ' + action.etype + ', error: ' + action.data));

    @Effect() loadEntitiesFail$ = this.actions$.ofType(entity.LOAD_ENTITIES_FAIL)
        .map((action: any) => new alert.Error('Fail to load ' + action.etype + 's, error: ' + action.data));

    @Effect() loadEntitiesScrollFail$ = this.actions$.ofType(entity.LOAD_ENTITIES_ON_SCROLL_FAIL)
        .map((action: any) => new alert.Error('Fail to load(scroll) ' + action.etype + 's, error: ' + action.data));

    @Effect() genThumbsFail$ = this.actions$.ofType(entity.GENERATE_THUMBS_FAIL)
        .map((action: any) => new alert.Error('缩略图生成失败'));


    /**************************************************************************
     * Helper functions
     *************************************************************************/

    /**
     * Get base api by given entity type
     */
    private getApi(t: string, isBatch: boolean) {
        if (!isBatch) {
            switch (t) {
                case ENTITY.POST:
                    return APIS[this.cache.key] + API_PATH.cms_posts;
                case ENTITY.TOPIC:
                    return APIS[this.cache.key] + API_PATH.cms_topics;
                case ENTITY.OFFER:
                    return APIS[this.cache.key] + API_PATH.cms_offers;
                case ENTITY.PAGE:
                    return APIS[this.cache.key] + API_PATH.cms_pages;
                case ENTITY.ADVERTISE:
                    return APIS[this.cache.key] + API_PATH.advertises;
                case ENTITY.NEWSLETTER:
                    return APIS[this.cache.key] + API_PATH.newsletter_posts;
                case ENTITY.ATTACHMENT:
                    return APIS[this.cache.key] + API_PATH.attachments;
                case ENTITY.COMMENT:
                    return APIS[this.cache.key] + API_PATH.comments;
                default:
                    return APIS[this.cache.key];
            }
        } else {
            switch (t) {
                case ENTITY.POST:
                    return APIS[this.cache.key] + API_PATH.cms_posts_batch;
                case ENTITY.TOPIC:
                    return APIS[this.cache.key] + API_PATH.cms_topics_batch;
                case ENTITY.OFFER:
                    return APIS[this.cache.key] + API_PATH.cms_offers_batch;
                case ENTITY.PAGE:
                    return APIS[this.cache.key] + API_PATH.cms_pages_batch;
                case ENTITY.ADVERTISE:
                    return APIS[this.cache.key] + API_PATH.advertises_batch;
                case ENTITY.NEWSLETTER:
                    return APIS[this.cache.key] + API_PATH.newsletter_posts_batch;
                case ENTITY.ATTACHMENT:
                    return APIS[this.cache.key] + API_PATH.attachments_batch;
                case ENTITY.COMMENT:
                    return APIS[this.cache.key] + API_PATH.comments_batch;
                default:
                    return APIS[this.cache.key];
            }
        }
    }

    /**
     * Convert EntityParams object into API server query string
     * @param params
     * @returns {string}
     */
    private params2String(params: EntityParams) {
        let s = '';
        for (let key in params) {
            if (params.hasOwnProperty(key) && typeof params[key] !== 'undefined' && params[key] !== null)
                s += key + '=' + params[key] + '&';
        }

        // Return the string with last '&' trimmed
        return s.substring(0, s.length - 1);
    }

    //////////////////////////////////////////////////////////////////////////
    // Network functions

    /**
     * Get a entity, return a entity
     */
    protected getEntity(t: string, id: string): Observable<any> {
        let api = this.getApi(t, false) +
            '/' + id + '?etype=' + t + '&token=' + this.cache.token;
        return this.http.get(api).map(res => res.json());
    }

    /**
     * Save an entity automatically
     */
    protected autoSaveEntity(t: string, entity: any, mask: string[]): Observable<any> {
        return this.saveEntity(t, entity, mask, true);
    }

    /**
     * Create/Update a entity, return a entity
     */
    protected saveEntity(t: string, entity: any, mask: string[],
                         isAuto = false): Observable<any> {
        // Filter possible duplicated mask entries
        let uniqueMask = mask.filter((m, idx, self) => idx == self.indexOf(m));
        // Create a new entity with modified attributes only
        let dirtyEntity: any = {id: entity.id};
        uniqueMask.forEach(m => dirtyEntity[m] = entity[m]);

        console.log("[AUTO: ", isAuto ,"] SAVING ENTITY: ", dirtyEntity);

        // Change new entity status from 'unsaved' to 'draft'
        if (this.isNewEntity(entity) && dirtyEntity.status == 'unsaved')
            dirtyEntity.status = 'draft';

        let body = JSON.stringify(dirtyEntity);
        let options = new RequestOptions({ headers: this.headers });
        let api = this.getApi(t, false);

        if (this.isNewEntity(entity)) {
            // Create a new entity
            api += '?etype=' + t;
            if (isAuto) api = api + '&auto=true';
            return this.http.post(api, body, options).map(res => res.json());
        } else {
            // Update an existing entity
            api += '/' + entity.id + '?etype=' + t;
            if (isAuto) api = api + '&auto=true';
            return this.http.put(api, body, options).map(res => res.json());
        }
    }

    /**
     * Delete a entity by it's id, return a entity
     */
    protected deleteEntity(t: string, id: number): Observable<any> {
        let options = new RequestOptions({ headers: this.headers });

        let api = this.getApi(t, false) + '/' + id + '?etype=' + t;
        return this.http.delete(api, options).map(res => res.json());
    }

    /**
     * Get entities, return any
     */
    protected getEntities(t: string, params: EntityParams): Observable<any> {
        // Default 20 entities per page
        let perPage = 20;

        // Default 60 images per page
        if (t === ENTITY.ATTACHMENT) perPage = 60;

        // Do not set per_page if we already have it
        if (params.hasOwnProperty('per_page')) perPage = params.per_page;

        let api = this.getApi(t, false)
            + '?' + this.params2String(params)
            + '&etype=' + t
            + '&per_page=' + perPage
            + '&token=' + this.cache.token;

        return this.http.get(api).map(res => res.json());
    }

    /**
     * Update entities, return array of entities, this is also used to generate
     * thumbnails etc.
     * @param t        - entity type
     * @param entities - entities to be updated
     * @param params - attachment entity only argument, it is 'gen-thumb' for
     *                 regenerating all thumbnails
     */
    protected putEntities(t: string, entities: any,
                          params: any = null): Observable<any> {
        let body    = JSON.stringify(entities);
        let options = new RequestOptions({ headers: this.headers });
        let api     = this.getApi(t, true) + '?etype=' + t;
        if (params) api += '&' + params;

        return this.http.put(api, body, options).map(res => res.json());
    }

    /**
     * Delete entities, return deleted entities,
     * delete request can't have a body, so ids are passing as parameters
     * @param etype - entity type
     * @param ids   - entity ids to be deleted
     */
    protected deleteEntities(etype: string, ids: number[]): Observable<any> {
        let options = new RequestOptions({ headers: this.headers });
        let api = this.getApi(etype, true) +
            '?etype=' + etype + '&ids=' + ids.join(',');

        return this.http.delete(api, options).map(res => res.json());
    }

    /**
     * Generate thumbnails for image uploaded in a range of date
     * @param t    - entity type
     * @param data - start and end date
     */
    protected genThumbnails(t: string, data: any = null) {
        let params =  'gen-thumb=true';
        if (data) params += '&' + this.params2String(data);
        return this.putEntities(t, null, params);
    }

    /**
     * If the entity is new which does not have a valid id(has placeholder id 0).
     */
    private isNewEntity(entity: any) {
        return entity && entity.id == 0;
    }

}