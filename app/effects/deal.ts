/**
 * Bangli domain deal[s] side effects
 */
import { Injectable }                     from '@angular/core';
import { Http, Headers, RequestOptions }  from '@angular/http';
import { Effect, Actions }                from '@ngrx/effects';
import { Observable }                     from 'rxjs/Observable';

import { AuthCache }    from '../auth.cache';
import { PrefCache }    from '../pref.cache';
import { DealActions }  from '../actions';
import { Deal }         from "../models";

@Injectable()
export class DealEffects {
    constructor(private actions$:Actions,
                private http:Http) { }

    get headers() {
        return new Headers({
            'Authorization': 'Bearer' + AuthCache.token(),
            'Content-Type': 'application/json'});
    }
}
