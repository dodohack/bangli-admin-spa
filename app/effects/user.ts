import { Injectable }                    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Effect, Actions }               from '@ngrx/effects';
import { Observable }                    from 'rxjs/Observable';

import { AuthCache }   from '../auth.cache';
import { PrefCache }   from '../pref.cache';
import { UserActions } from '../actions';
import { User }        from '../models';

@Injectable()
export class UserEffects {
    
    constructor(private actions$: Actions,
                private http: Http) {
    }
    
    @Effect() search$ = this.actions$.ofType(UserActions.SEARCH)
        .map(action => JSON.stringify(action.payload))
        .filter(query => query !== '')
        .switchMap(query => this.searchUsers(query)
            .map(users => UserActions.searchComplete(users))
            .catch(() => Observable.of(UserActions.searchComplete([])))
        );
    
    @Effect() clearSearch$ = this.actions$.ofType(UserActions.SEARCH)
        .map(action => JSON.stringify(action.payload))
        .filter(query => query === '')
        .mapTo(UserActions.searchComplete([]));

    @Effect() loadUsers$ = this.actions$.ofType(UserActions.LOAD_USERS)
        .map(action => action.payload)
        .switchMap(filters => this.getUsers(filters))
        .map(users => UserActions.loadUsersSuccess(users))
        .catch(() => Observable.of(UserActions.loadUsersFail()));

    @Effect() loadUser$ = this.actions$.ofType(UserActions.LOAD_USER)
        .map(action => action.payload)
        .switchMap(uuid => this.getUser(uuid))
        .map(user => UserActions.loadUserSuccess(user))
        .catch(() => Observable.of(UserActions.loadUserFail()));


    /////////////////////////////////////////////////////////////////////////
    // Http functions
/*
    private _get(api: string) {
        let headers = new Headers({'Authorization': 'Bearer TODO: JWT TOKEN HERE'});
        let options = new RequestOptions({ headers: headers });
        return this.http.get(api, options).map(res => res.json());
    }
*/
    private _post(api: string, body: string) {
        let headers = new Headers({
            'Authorization': 'Bearer TODO: JWT TOKEN HERE',
            'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return this.http.post(api, body, options).map(res => res.json());
    }

    private searchUsers(query: string): Observable<User[]> {
        let api = AuthCache.API();
        return this.http.get(api).map(res => res.json());
    }

    private getUsers(filters: any): Observable<any> {
        let cur_page = filters.cur_page;
        let role_id  = filters.role_id;
        let api = AuthCache.API().users + '/' + cur_page +
            '?role_id=' + role_id +
            '&per_page=' + PrefCache.getPerPage() +
            '&token=' + AuthCache.token();
        return this.http.get(api).map(res => res.json());
    }

    private getUser(uuid: string): Observable<User> {
        let api = AuthCache.API().user + '/' + uuid + '?token=' + AuthCache.token();
            return this.http.get(api).map(res => res.json());
    }
}
