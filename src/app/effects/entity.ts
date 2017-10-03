/**
 * Side effects for entities listed below:
 * cms-post, cms-topic, cms-page, deal, shop-order,
 * shop-product, voucher, newsletter, etc
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
            .map(ret => new entity.SaveEntitySuccess({etype: ret.etype, data: ret.entity}))
            .catch(() => Observable.of(new entity.SaveEntityFail()))
        );

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
                case ENTITY.CMS_POST:
                    return APIS[this.cache.key] + API_PATH.cms_posts;
                case ENTITY.CMS_TOPIC:
                    return APIS[this.cache.key] + API_PATH.cms_topics;
                case ENTITY.CMS_DEAL:
                    return APIS[this.cache.key] + API_PATH.cms_deals;
                case ENTITY.CMS_PAGE:
                    return APIS[this.cache.key] + API_PATH.cms_pages;
                case ENTITY.ADVERTISE:
                    return APIS[this.cache.key] + API_PATH.advertises;
                case ENTITY.NEWSLETTER:
                    return APIS[this.cache.key] + API_PATH.newsletter_posts;
                case ENTITY.ATTACHMENT:
                    return APIS[this.cache.key] + API_PATH.attachments;
                case ENTITY.COMMENT:
                    return APIS[this.cache.key] + API_PATH.comments;
                case ENTITY.SHOP_ORDER:
                    return APIS[this.cache.key] + API_PATH.shop_orders;
                case ENTITY.SHOP_PRODUCT:
                    return APIS[this.cache.key] + API_PATH.shop_products;
                case ENTITY.SHOP_VOUCHER:
                    return APIS[this.cache.key] + API_PATH.shop_vouchers;
                default:
                    return null;
            }
        } else {
            switch (t) {
                case ENTITY.CMS_POST:
                    return APIS[this.cache.key] + API_PATH.cms_posts_batch;
                case ENTITY.CMS_TOPIC:
                    return APIS[this.cache.key] + API_PATH.cms_topics_batch;
                case ENTITY.CMS_DEAL:
                    return APIS[this.cache.key] + API_PATH.cms_deals_batch;
                case ENTITY.CMS_PAGE:
                    return APIS[this.cache.key] + API_PATH.cms_pages_batch;
                case ENTITY.ADVERTISE:
                    return APIS[this.cache.key] + API_PATH.advertises_batch;
                case ENTITY.NEWSLETTER:
                    return APIS[this.cache.key] + API_PATH.newsletter_posts_batch;
                case ENTITY.ATTACHMENT:
                    return APIS[this.cache.key] + API_PATH.attachments_batch;
                case ENTITY.COMMENT:
                    return APIS[this.cache.key] + API_PATH.comments_batch;
                case ENTITY.SHOP_ORDER:
                    return APIS[this.cache.key] + API_PATH.shop_orders_batch;
                case ENTITY.SHOP_PRODUCT:
                    return APIS[this.cache.key] + API_PATH.shop_products_batch;
                case ENTITY.SHOP_VOUCHER:
                    return APIS[this.cache.key] + API_PATH.shop_vouchers_batch;
                default:
                    return null;
            }
        }
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
        mask.forEach(m => dirtyEntity[m] = entity[m]);

        console.log("[AUTO: ", isAuto ,"] SAVING ENTITY: ", dirtyEntity);

        // Change entity state from 'unsaved' to 'draft'.
        if (this.isNewEntity(entity))  dirtyEntity.state = 'draft';

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
     * Delete a entity, return a entity
     */
    protected deleteEntity(t: string, entity: any): Observable<any> {
        let options = new RequestOptions({ headers: this.headers });

        let api = this.getApi(t, false) + '/' + entity.id + '?etype=' + t;
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
            + params.toQueryString()
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
     * Delete entities, return deleted entities
     */
    protected deleteEntities(t: string, entities: any): Observable<any> {
        let body = JSON.stringify(entities);
        let options = new RequestOptions({ headers: this.headers });
        let api = this.getApi(t, true) + '?etype=' + t;

        // TODO: http.delete can't have a body
        console.error("Unimplemented: deletePosts");
        return this.http.delete(api, options).map(res => res.json());
    }

    /**
     * If the entity is new which does not have a valid id(has placeholder id 0).
     */
    private isNewEntity(entity: any) {
        return entity && entity.id == 0;
    }

}