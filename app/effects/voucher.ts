/**
 * Voucher[s] side effects
 */
import { Injectable }                     from '@angular/core';
import { Http, Headers, RequestOptions }  from '@angular/http';
import { Effect, Actions }                from '@ngrx/effects';
import { Observable }                     from 'rxjs/Observable';

import { AuthCache }       from '../auth.cache';
import { PrefCache }       from '../pref.cache';
import { VoucherActions }  from '../actions';
import { Voucher }         from "../models";

@Injectable()
export class VoucherEffects {

    api: string;
    headers: Headers;

    constructor (private actions$: Actions,
                 private http: Http) {
        this.headers = new Headers({
            'Authorization': 'Bearer' + AuthCache.token(),
            'Content-Type': 'application/json'});

        this.api = AuthCache.API();
    }
}
