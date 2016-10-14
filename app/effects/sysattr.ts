/**
 * System attributes, excluding cms, shop and bbs related.
 */
import { Injectable }                    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Effect, Actions }               from '@ngrx/effects';
import { Observable }                    from 'rxjs/Observable';

import { CacheSingleton }   from './cache.singleton';
import { APIS, API_PATH }   from '../api';
import { SysAttrsState }    from '../reducers/sysattrs';
import { SysAttrActions }   from '../actions';

@Injectable()
export class SysAttrEffects {
    cache = CacheSingleton.getInstance();

    constructor(private actions$: Actions,
                private http: Http) { }

    @Effect() loadAll$ = this.actions$.ofType(SysAttrActions.LOAD_ALL)
        .switchMap(action => this.getAll(action.payload)
            .map(attrs => SysAttrActions.loadAllSuccess(attrs))
            .catch(() => Observable.of(SysAttrActions.loadAllFail())));

    //////////////////////////////////////////////////////////////////////////
    // Private helper functions

    private getAll(key: string = undefined): Observable<SysAttrsState> {
        // Cache the key for current session scope
        if (key) this.cache.key = key;

        let api = APIS[this.cache.key] + API_PATH.sys_attrs +
            '?token=' + this.cache.token;
        return this.http.get(api).map(res => res.json());
    }

}