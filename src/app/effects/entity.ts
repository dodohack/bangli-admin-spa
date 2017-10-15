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
            .catch(() => Observable.of(new entity.LoadEntitiesFail()))
        );

    @Effect() loadEntitiesOnScroll$ = this.actions$.ofType(entity.LOAD_ENTITIES_ON_SCROLL)
        .switchMap((action: any) => this.getEntities(action.payload.etype, action.payload.data)
            .map(ret => new entity.LoadEntitiesOnScrollSuccess({etype: ret.etype, data: ret}))
            .catch(() => Observable.of(new entity.LoadEntitiesOnScrollFail()))
        );    

    @Effect() loadEntity$ = this.actions$.ofType(entity.LOAD_ENTITY)
        .switchMap((action: any) => this.getEntity(action.payload.etype, action.payload.data)
            .map(ret => new entity.LoadEntitySuccess({etype: ret.etype, data: ret.entity, prepend: false}))
            .catch(() => Observable.of(new entity.LoadEntityFail()))
        );

    @Effect() saveEntity$ = this.actions$.ofType(entity.SAVE_ENTITY)
        .map((action: any) => action.payload)
        .switchMap(p => this.saveEntity(p.etype, p.data, p.mask)
            .mergeMap(ret => {
                let actions = [
                    // Delete draft(id=0) entity when save is succeed
                    new entity.DeleteEntity({etype: ret.etype, data: 0}),
                    new entity.SaveEntitySuccess({etype: ret.etype, data: ret.entity})
                ];
                return Observable.from(actions);
            })
            .catch(() => Observable.of(new entity.SaveEntityFail()))
        );

    @Effect() deleteEntity$ = this.actions$.ofType(entity.DELETE_ENTITY)
        .map((action: any) => action.payload)
        .filter(p => p.id) // Do not send delete action for id 0 entity
        .switchMap(p => this.deleteEntity(p.etype, p.data)
            .map(ret => new entity.DeleteEntitySuccess())
            .catch(() => Observable.of(new entity.DeleteEntityFail()))
        );

    @Effect() batchDeleteEntities$ = this.actions$.ofType(entity.BATCH_DELETE_ENTITIES)
        .map((action: any) => action.payload)
        .switchMap(p => this.deleteEntities(p.etype, p.data)
            .map(ret => new entity.BatchDeleteEntitiesSuccess())
            .catch(() => Observable.of(new entity.BatchDeleteEntitiesFail())));

    @Effect() autoSave$ = this.actions$.ofType(entity.AUTO_SAVE)
        .map((action: any) => action.payload)
        .switchMap(p => this.autoSaveEntity(p.etype, p.data, p.mask)
            .map(ret => new entity.AutoSaveSuccess({etype: ret.etype, data: ret.entity}))
            .catch(() => Observable.of(new entity.SaveEntityFail()))
        );

    @Effect() autoSaveSuccess$ = this.actions$.ofType(entity.AUTO_SAVE_SUCCESS)
        .map((action: any) => new alert.Success('自动保存成功, 此消息应该不用这么明显'));
    
    @Effect() saveEntitySuccess$ = this.actions$.ofType(entity.SAVE_ENTITY_SUCCESS)
        .map((action: any) => new alert.Success('保存成功!'));

    @Effect() saveEntityFail$ = this.actions$.ofType(entity.SAVE_ENTITY_FAIL)
        .map((action: any) => new alert.Error('保存失败!'));


    @Effect() genThumbs$ = this.actions$.ofType(entity.GENERATE_THUMBS)
        .map((action: any) => action.payload)
        .switchMap(etype => this.putEntities(etype, [], 'gen-thumb'));

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
                    return null;
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
                    return null;
            }
        }
    }

    /**
     * Convert EntityParams object into API server query string
     * @param params
     * @returns {string}
     */
    private params2String(params: EntityParams) {
        let s = '?';
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
        let perPage = '20';
        // Attachment list uses infinite scroll
        if (t === ENTITY.ATTACHMENT) perPage = '60';

        let api = this.getApi(t, false)
            + this.params2String(params)
            + '&etype=' + t
            + '&per_page=' + perPage
            + '&token=' + this.cache.token;

        //console.log("LOAD ENTITIES FROM URL: ", api);

        return this.http.get(api).map(res => res.json());
    }

    /**
     * Update entities, return array of entities, this is also used to generate
     * thumbnails etc.
     * @param t        - entity type
     * @param entities - entities to be updated
     * @param params - attachemnt entity only argument, it is 'gen-thumb' for
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
     * If the entity is new which does not have a valid id(has placeholder id 0).
     */
    private isNewEntity(entity: any) {
        return entity && entity.id == 0;
    }

}