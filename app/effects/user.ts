import { Injectable }                    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Effect, Actions }               from '@ngrx/effects';
import { Observable }                    from 'rxjs/Observable';

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
        .switchMap(api => this.getUsers(api))
        .map(users => {
            console.log("Trying to get users: ", users);
            return UserActions.loadUsersSuccess(users);
        })
        .catch(() => Observable.of(UserActions.loadUsersFail()));

    @Effect() loadUser$ = this.actions$.ofType(UserActions.LOAD_USER)
        .map(action => JSON.stringify(action.payload))
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
        let api = '';
        return this.http.get(api).map(res => res.json());
    }

    private getUsers(api: string): Observable<any> {
        return this.http.get(api).map(res => res.json());
    }

    private getUser(uuid: string): Observable<User> {
        let api = '';
        return this.http.get(api).map(res => res.json());
    }
}
