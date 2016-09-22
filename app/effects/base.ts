/**
 * Entity[s] side effects
 */
import { Http, Headers, RequestOptions }  from '@angular/http';
import { Observable }                     from 'rxjs/Observable';

import { AuthCache }       from '../auth.cache';
import { PrefCache }       from '../pref.cache';

import { PostParams }      from "../models";

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
                case 'cms-post':
                    return AuthCache.API() + AuthCache.API_PATH().cms_posts;
                case 'cms-topic':
                    return AuthCache.API() + AuthCache.API_PATH().cms_topics;
                case 'deal-post':
                    return AuthCache.API() + AuthCache.API_PATH().deal_posts;
                case 'deal-topic':
                    return AuthCache.API() + AuthCache.API_PATH().deal_topics;
                case 'page-post':
                    return AuthCache.API() + AuthCache.API_PATH().cms_pages;
                case 'newsletter-post':
                    return AuthCache.API() + AuthCache.API_PATH().newsletter_posts;
                case 'shop-order':
                    return AuthCache.API() + AuthCache.API_PATH().shop_orders;
                case 'shop-product':
                    return AuthCache.API() + AuthCache.API_PATH().shop_products;
                case 'shop-voucher':
                    return AuthCache.API() + AuthCache.API_PATH().shop_vouchers;
                default:
                    return null;
            }
        } else {
            switch (t) {
                case 'cms-post':
                    return AuthCache.API() + AuthCache.API_PATH().cms_posts_batch;
                case 'cms-topic':
                    return AuthCache.API() + AuthCache.API_PATH().cms_topics_batch;
                case 'deal-post':
                    return AuthCache.API() + AuthCache.API_PATH().deal_posts_batch;
                case 'deal-topic':
                    return AuthCache.API() + AuthCache.API_PATH().deal_topics_batch;
                case 'page-post':
                    return AuthCache.API() + AuthCache.API_PATH().cms_pages_batch;
                case 'newsletter-post':
                    return AuthCache.API() + AuthCache.API_PATH().newsletter_posts_batch;
                case 'shop-order':
                    return AuthCache.API() + AuthCache.API_PATH().shop_orders_batch;
                case 'shop-product':
                    return AuthCache.API() + AuthCache.API_PATH().shop_products_batch;
                case 'shop-voucher':
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
            '/' + id + '?token=' + AuthCache.token();
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
            api += '/' + entity.id;
            return this.http.put(api, body, options).map(res => res.json());
        } else {
            // Create a new entity
            return this.http.post(api, body, options).map(res => res.json());
        }
    }

    /**
     * Delete a entity, return a entity
     */
    protected deleteEntity(t: string, entity: any): Observable<any> {
        let options = new RequestOptions({ headers: this.headers });

        let api = this.getApi(t, false) + '/' + entity.id;
        return this.http.delete(api, options).map(res => res.json());
    }

    /**
     * Get entities, return any
     */
    protected getEntities(t: string, params: PostParams): Observable<any> {
        let api = this.getApi(t, false)
              + params.toQueryString()
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
        let api = this.getApi(t, true);

        return this.http.put(api, body, options).map(res => res.json());
    }

    /**
     * Delete entities, return deleted entities
     */
    protected deleteEntities(t: string, entities: any): Observable<any> {
        let body = JSON.stringify(entities);
        let options = new RequestOptions({ headers: this.headers });
        let api = this.getApi(t, true);

        // TODO: http.delete can't have a body
        console.error("Unimplemented: deletePosts");
        return this.http.delete(api, options).map(res => res.json());
    }

}