/**
 * Load shop attributes on app startup.
 */
import { Injectable }                    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Effect, Actions }               from '@ngrx/effects';
import { Observable }                    from 'rxjs/Observable';

import { CacheSingleton }   from './cache.singleton';
import { APIS, API_PATH }   from '../api';
import { ShopAttrsState }   from '../reducers/shopattrs';
import { ShopAttrActions }  from '../actions';

@Injectable()
export class ShopAttrEffects {
    cache = CacheSingleton.getInstance();
    
    constructor(private actions$: Actions,
                private http: Http) { }
    
    @Effect() loadAll$ = this.actions$.ofType(ShopAttrActions.LOAD_ALL)
        .switchMap(action => this.getAll(action.payload)
            .map(attrs => ShopAttrActions.loadAllSuccess(attrs))
            .catch(() => Observable.of(ShopAttrActions.loadAllFail()))
        );

    //////////////////////////////////////////////////////////////////////////
    // Private helper functions

    private getAll(key: string = undefined): Observable<ShopAttrsState> {
        // Cache the key for current session scope
        if (key) this.cache.key = key;
        
        let api = APIS[this.cache.key] + API_PATH.shop_attrs +
            '?token=' + this.cache.token;
        return this.http.get(api).map(res => res.json());
    }
}
