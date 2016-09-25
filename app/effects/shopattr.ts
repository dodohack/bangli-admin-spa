/**
 * Load shop attributes on app startup.
 */
import { Injectable }                    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Effect, Actions }               from '@ngrx/effects';
import { Observable }                    from 'rxjs/Observable';

import { APIS, API_PATH }   from '../api';
import { AuthState }        from '../reducers/auth';
import { ShopAttrsState }   from '../reducers/shopattrs';
import { ShopAttrActions }  from '../actions';

@Injectable()
export class ShopAttrEffects {
    constructor(private actions$: Actions,
                private http: Http) { }

    @Effect() loadAll$ = this.actions$.ofType(ShopAttrActions.LOAD_ALL)
        .switchMap((action) => this.getAll(action.payload)
            .map(attrs => ShopAttrActions.loadAllSuccess(attrs))
            .catch(() => Observable.of(ShopAttrActions.loadAllFail()))
        );

    //////////////////////////////////////////////////////////////////////////
    // Private helper functions

    private getAll(auth: AuthState): Observable<ShopAttrsState> {
        let api = APIS[auth.key] + API_PATH.shop_attrs +
            '?token=' + auth.token;
        return this.http.get(api).map(res => res.json());
    }
}
