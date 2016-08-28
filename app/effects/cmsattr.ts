/**
 * Load CMS attributes on app startup.
 */
import { Injectable }                    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Effect, Actions }               from '@ngrx/effects';
import { Observable }                    from 'rxjs/Observable';

import { APIS, API_PATH }   from '../api';
import { AuthState }        from '../reducers/auth';
import { CmsAttrsState }    from '../reducers/cmsattrs';
import { CmsAttrActions }   from '../actions';

@Injectable()
export class CmsAttrEffects {
    constructor(private actions$: Actions,
                private http: Http) { }
    
    @Effect() loadAll$ = this.actions$.ofType(CmsAttrActions.LOAD_ALL)
        .switchMap((action) => this.getAll(action.payload)
            .map(attrs => CmsAttrActions.loadAllSuccess(attrs))
            .catch(() => Observable.of(CmsAttrActions.loadAllFail()))
        );

    //////////////////////////////////////////////////////////////////////////
    // Private helper functions
    
    private getAll(auth: AuthState): Observable<CmsAttrsState> {

        let api = APIS[auth.key] + API_PATH[auth.key].cms_attrs +
            '?token=' + auth.token;
        console.log("***CMS_ATTRS API: ", api);
        return this.http.get(api).map(res => res.json());
    } 
}
