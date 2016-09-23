/**
 * Entity[s] side effects
 */
import { Http, Headers, RequestOptions }  from '@angular/http';
import { Observable }                     from 'rxjs/Observable';

import { AuthCache }       from '../auth.cache';
import { PrefCache }       from '../pref.cache';
import { ENTITY }          from '../models';
import { PostParams }      from '../models';

export class BaseEffects {

    constructor (protected http: Http) {}
    
    get headers() { 
        return new Headers({
            'Authorization': 'Bearer' + AuthCache.token(),
            'Content-Type': 'application/json'});
    }

    /**
     * Get base api by given entity type
     */
    private getApi(t: string, isBatch: boolean) {
        if (!isBatch) {
            switch (t) {
                case ENTITY.CMS_POST:
                    return AuthCache.API() + AuthCache.API_PATH().cms_posts;
                case ENTITY.CMS_TOPIC:
                    return AuthCache.API() + AuthCache.API_PATH().cms_topics;
                case ENTITY.DEAL_POST:
                    return AuthCache.API() + AuthCache.API_PATH().deal_posts;
                case ENTITY.CMS_PAGE:
                    return AuthCache.API() + AuthCache.API_PATH().cms_pages;
                case ENTITY.NEWSLETTER:
                    return AuthCache.API() + AuthCache.API_PATH().newsletter_posts;
                case ENTITY.SHOP_ORDER:
                    return AuthCache.API() + AuthCache.API_PATH().shop_orders;
                case ENTITY.SHOP_PRODUCT:
                    return AuthCache.API() + AuthCache.API_PATH().shop_products;
                case ENTITY.VOUCHER:
                    return AuthCache.API() + AuthCache.API_PATH().shop_vouchers;
                default:
                    return null;
            }
        } else {
            switch (t) {
                case ENTITY.CMS_POST:
                    return AuthCache.API() + AuthCache.API_PATH().cms_posts_batch;
                case ENTITY.CMS_TOPIC:
                    return AuthCache.API() + AuthCache.API_PATH().cms_topics_batch;
                case ENTITY.DEAL_POST:
                    return AuthCache.API() + AuthCache.API_PATH().deal_posts_batch;
                case ENTITY.CMS_PAGE:
                    return AuthCache.API() + AuthCache.API_PATH().cms_pages_batch;
                case ENTITY.NEWSLETTER:
                    return AuthCache.API() + AuthCache.API_PATH().newsletter_posts_batch;
                case ENTITY.SHOP_ORDER:
                    return AuthCache.API() + AuthCache.API_PATH().shop_orders_batch;
                case ENTITY.SHOP_PRODUCT:
                    return AuthCache.API() + AuthCache.API_PATH().shop_products_batch;
                case ENTITY.VOUCHER:
                    return AuthCache.API() + AuthCache.API_PATH().shop_vouchers_batch;
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
            '/' + id + '?etype=' + t + '&token=' + AuthCache.token();
        return this.http.get(api).map(res => res.json());
    }
    
    /**
     * Create/Update a entity, return a entity
     */
    protected saveEntity(t: string, entity: any): Observable<any> {
        console.log("SAVING ENTITY: ", entity);

        let body = JSON.stringify(entity);
        let options = new RequestOptions({ headers: this.headers });
        let api = this.getApi(t, false);

        if (entity.id && entity.id !== 0) {
            // Update an existing entity
            api += '/' + entity.id + '?etype=' + t;
            return this.http.put(api, body, options).map(res => res.json());
        } else {
            // Create a new entity
            api += '?etype=' + t;
            return this.http.post(api, body, options).map(res => res.json());
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
    protected getEntities(t: string, params: PostParams): Observable<any> {
        let api = this.getApi(t, false)
            + params.toQueryString()
            + '&etype=' + t
            + '&per_page=' + PrefCache.getPerPage()
            + '&token=' + AuthCache.token();

        console.log("LOAD ENTITIES FROM URL: ", api);

        return this.http.get(api).map(res => res.json());
    }

    /**
     * Update entities, return array of entities
     */
    protected putEntities(t: string, entities: any): Observable<any> {
        let body = JSON.stringify(entities);
        let options = new RequestOptions({ headers: this.headers });
        let api = this.getApi(t, true) + '?etype=' + t;

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

}