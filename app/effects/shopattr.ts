/**
 * Load shop attributes on app startup.
 */
import { Injectable }                    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Effect, Actions }               from '@ngrx/effects';
import { Observable }                    from 'rxjs/Observable';

import { BaseEffects }      from './effect.base';
import { APIS, API_PATH }   from '../api';
import { ShopAttrsState }   from '../reducers/shopattrs';
import { ShopAttrActions }  from '../actions';

@Injectable()
export class ShopAttrEffects extends BaseEffects {
    constructor(private actions$: Actions,
                private http: Http) {
        super();
    }
    
    @Effect() loadAll$ = this.actions$.ofType(ShopAttrActions.LOAD_ALL)
        .switchMap(() => this.getAll()
            .map(attrs => ShopAttrActions.loadAllSuccess(attrs))
            .catch(() => Observable.of(ShopAttrActions.loadAllFail()))
        );

    //////////////////////////////////////////////////////////////////////////
    // Private helper functions

    private getAll(): Observable<ShopAttrsState> {
        let api = APIS[this.key] + API_PATH.shop_attrs +
            '?token=' + this.token;
        return this.http.get(api).map(res => res.json());
    }
}
