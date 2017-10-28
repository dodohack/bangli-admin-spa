/**
 * Load/Save offer filters
 */
import { Injectable }                    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Effect, Actions }               from '@ngrx/effects';
import { Observable }                    from 'rxjs/Observable';

import { CacheSingleton }  from './cache.singleton';
import { APIS, API_PATH }  from '../api';

import * as OF from '../actions/offer.filter';


@Injectable()
export class OfferFilterEffects {
    cache = CacheSingleton.getInstance();

    constructor(private actions$: Actions,
                private http: Http) {}


    get headers() {
        return new Headers({
            'Authorization': 'Bearer ' + this.cache.token,
            'Content-Type': 'application/json'
        });
    }

    @Effect() load$ = this.actions$.ofType(OF.LOAD)
        .switchMap((action: any) => this.get(action.payload)
            .map(ret => new OF.LoadSuccess(ret.data))
            .catch((error) => Observable.of(new OF.LoadFail(error)))
        );

    @Effect() loadAll$ = this.actions$.ofType(OF.LOAD_ALL)
        .switchMap((action: any) => this.getAll()
            .map(ret => new OF.LoadAllSuccess(ret.data))
            .catch((error) => Observable.of(new OF.LoadFail(error)))
        );

    @Effect() save$ = this.actions$.ofType(OF.SAVE)
        .switchMap((action: any) => this.put(action.payload.ftype, action.payload.data)
            .map(ret => new OF.SaveSuccess(ret.data))
            .catch((error) => Observable.of(new OF.SaveFail(error)))
        );

    @Effect() new$ = this.actions$.ofType(OF.NEW)
        .switchMap((action: any) => this.post(action.payload)
            .map(ret => new OF.SaveSuccess(ret.data))
            .catch((error) => Observable.of(new OF.SaveFail(error)))
        );

    //////////////////////////////////////////////////////////////////////////
    // Private helper functions

    /**
     * If given filter type is valid or not
     * @param ftype - filter type
     */
    private isValidFType(ftype: string) {
        if (ftype == null || ftype == '' || typeof ftype === 'undefined') {
            console.error("Incorrect offer filter type!");
            return false;
        }
        return true;
    }

    /**
     * get offer filters
     * @param ftype - filter type
     */
    private get(ftype: string) {
        if (!this.isValidFType(ftype)) return;

        let api = APIS[this.cache.key] + API_PATH.offer_filters + '/' + ftype +
                '?token=' + this.cache.token;
        return this.http.get(api).map(res => res.json());
    }

    /**
     * get all offer filters
     */
    private getAll() {
        let api = APIS[this.cache.key] + API_PATH.offer_filters +
            '?token=' + this.cache.token;
        return this.http.get(api).map(res => res.json());
    }


    /**
     * Update offer filters
     */
    private put(ftype: string, data: string) {
        if (!this.isValidFType(ftype)) return;

        let obj = { content: data };
        let body = JSON.stringify(obj);
        let options = new RequestOptions({ headers: this.headers });

        let api = APIS[this.cache.key] + API_PATH.offer_filters + '/' + ftype;
        return this.http.put(api, body, options).map(res => res.json());
    }

    /**
     * Create new offer filters
     * @param ftype - filter type
     * @param payload - new filter object
     */
    private post(payload: any) {
        let body = JSON.stringify(payload);
        let options = new RequestOptions({ headers: this.headers });

        let api = APIS[this.cache.key] + API_PATH.offer_filters;
        return this.http.post(api, body, options).map(res => res.json());
    }
}