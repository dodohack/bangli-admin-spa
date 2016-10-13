/**
 * System attributes, excluding cms, shop and bbs related.
 */
import { Injectable }                    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Effect, Actions }               from '@ngrx/effects';
import { Observable }                    from 'rxjs/Observable';

import { BaseEffects }      from './effect.base';
import { APIS, API_PATH }   from '../api';
import { SysAttrsState }    from '../reducers/sysattrs';
import { SysAttrActions }   from '../actions';

@Injectable()
export class SysAttrEffects extends BaseEffects {

    constructor(private actions$: Actions,
                private http: Http) {
        super();
    }

    @Effect() loadAll$ = this.actions$.ofType(SysAttrActions.LOAD_ALL)
        .switchMap(() => this.getAll()
            .map(attrs => SysAttrActions.loadAllSuccess(attrs))
            .catch(() => Observable.of(SysAttrActions.loadAllFail())));

    //////////////////////////////////////////////////////////////////////////
    // Private helper functions

    private getAll(): Observable<SysAttrsState> {
        let api = APIS[this.key] + API_PATH.sys_attrs + '?token=' + this.token;
        return this.http.get(api).map(res => res.json());
    }

}
