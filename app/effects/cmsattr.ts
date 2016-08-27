/**
 * Load CMS attributes on app startup.
 */
import { Injectable }                    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Effect, Actions }               from '@ngrx/effects';
import { Observable }                    from 'rxjs/Observable';

import { AuthCache }        from '../auth.cache';
import { CmsAttrsState }    from '../reducers/cmsattrs';
import { CmsAttrActions }   from '../actions';

@Injectable()
export class CmsAttrEffects {

    api: string;
    headers: Headers;

    constructor(private actions$: Actions,
                private http: Http) {
        this.headers = new Headers({
            'Authorization': 'Bearer' + AuthCache.token(),
            'Content-Type': 'application/json'});
        this.api = AuthCache.API();
    }
    
    @Effect() loadAll$ = this.actions$.ofType(CmsAttrActions.LOAD_ALL)
        .switchMap(() => this.getAll()
            .map(attrs => CmsAttrActions.loadAllSuccess(attrs))
            .catch(() => Observable.of(CmsAttrActions.loadAllFail()))
        );
    
    //////////////////////////////////////////////////////////////////////////
    // Private helper functions
    
    private getAll(): Observable<CmsAttrsState> {
        let api = this.api + AuthCache.API_PATH().cms_attrs + 
            '?token=' + AuthCache.token();
        return this.http.get(api).map(res => res.json());
    } 
}
