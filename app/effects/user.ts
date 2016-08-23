import { Injectable }                    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Effect, Actions }               from '@ngrx/effects';
import { Observable }                    from 'rxjs/Observable';

import { AuthEffects } from './auth';
import { UserActions } from '../actions';
import { User }        from '../models';

@Injectable()
export class UserEffects {
    constructor(private headers: Headers,
                private options: RequestOptions,
                private actions$: Actions,
                private auth: AuthEffects,
                private http: Http) {
        this.headers = new Headers({'Content-Type': 'application/json'});
        this.headers.append('Authorization', 'Bearer TODO: JWT TOKEN HERE');
        this.options = new RequestOptions({ headers: this.headers });        
    }
    
    @Effect() search$ = this.actions$.ofType(UserActions.SEARCH)
        .filter(query => query !== '')
        .switchMap(query => this.searchUsers(query)
            .map(users => UserActions.searchComplete(users))
            .catch(() => Observable.of(UserActions.searchComplete([])))
        );
    
    @Effect() clearSearch$ = this.actions$.ofType(UserActions.SEARCH)
        .filter(query => query === '')
        .mapTo(UserActions.searchComplete([]));

    @Effect() loadUser$ = this.actions$.ofType(UserActions.LOAD_USER)
        .map(action => JSON.stringify(action.payload))
        .switchMap(payload => this.getUser(payload))
        .map(user => UserActions.loadUserSuccess(user))
        .catch(() => Observable.of(UserActions.loadUserFail()));


    /////////////////////////////////////////////////////////////////////////
    // Http functions

    private searchUsers(query: string): Observable<User[]> {
        let api = '';
        return this.http.get(api, this.options).map(res => res.json());
    }

    private getUser(): Observable<User> {
        let api = '';
        return this.http.get(api, this.options).map(res => res.json());
    }
}
