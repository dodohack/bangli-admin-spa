/**
 * Load menu configurations
 */
import { Injectable }                    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Effect, Actions }               from '@ngrx/effects';
import { Observable }                    from 'rxjs/Observable';

import { CacheSingleton }  from './cache.singleton';
import { APIS, API_PATH }  from '../api';
import { FeMenusState }    from '../reducers/femenus';
import { FeMenuActions }   from '../actions';

@Injectable()
export class FeMenuEffects {
    cache = CacheSingleton.getInstance();

    constructor(private actions$: Actions,
                private http: Http) { }


    get headers() {
        return new Headers({
            'Authorization': 'Bearer ' + this.cache.token,
            'Content-Type': 'application/json'
        });
    }

    @Effect() loadAll$ = this.actions$.ofType(FeMenuActions.LOAD_ALL)
        .switchMap(() => this.getAll()
            .map(menus => FeMenuActions.loadAllSuccess(menus))
            .catch(() => Observable.of(FeMenuActions.loadAllFail()))
        );

    //////////////////////////////////////////////////////////////////////////
    // Private helper functions

    // Get all desktop and mobile frontend menus
    private getAll(): Observable<FeMenusState> {
        let api = APIS[this.cache.key] + API_PATH.fe_menus +
            '?token=' + this.cache.token;
        return this.http.get(api).map(res => res.json());
    }
}
