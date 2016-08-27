import { Injectable }                    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Effect, Actions }               from '@ngrx/effects';
import { Observable }                    from 'rxjs/Observable';

import { AuthCache }   from '../auth.cache';
import { PrefCache }   from '../pref.cache';
import { UserActions } from '../actions';
import { User }        from '../models';
import { Domain }      from '../models';
import { AUTH }        from '../api';

@Injectable()
export class UserEffects {

    api: string;
    headers: Headers;
    
    constructor(private actions$: Actions,
                private http: Http) {
        this.headers = new Headers({
            'Authorization': 'Bearer' + AuthCache.token(),
            'Content-Type': 'application/json'});
        this.api = AuthCache.API();
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
        .switchMap(action => this.getUsers(action.payload))
        .map(users => UserActions.loadUsersSuccess(users))
        .catch(() => Observable.of(UserActions.loadUsersFail()));

    @Effect() loadUser$ = this.actions$.ofType(UserActions.LOAD_USER)
        .switchMap(action => this.getUser(action.payload))
        .map(user => UserActions.loadUserSuccess(user))
        .catch(() => Observable.of(UserActions.loadUserFail()));

    /* Load domains of user can manage */
    @Effect() loadDomains$ = this.actions$.ofType(UserActions.LOAD_DOMAINS)
        .switchMap(action => this.getUserDomains(action.payload))
        .map(domains => UserActions.loadDomainsSuccess(domains))
        .catch(() => Observable.of(UserActions.loadDomainsFail()));

    /* Update domains of user can manage */
    @Effect() saveDomains$ = this.actions$.ofType(UserActions.SAVE_DOMAINS)
        .switchMap(action => this.postUserDomains(action.payload))
        .map(res => UserActions.saveDomainsSuccess(res))
        .catch(() => Observable.of(UserActions.saveDomainsFail()));

    /////////////////////////////////////////////////////////////////////////
    // Http functions


    /**
     * Get single user
     */
    private getUser(uuid: string): Observable<User> {
        let api = this.api + AuthCache.API_PATH().users + '/' + uuid + '?token=' + AuthCache.token();
        return this.http.get(api).map(res => res.json());
    }


    /**
     * Update single user
     */
    private putUser(user: User): Observable<User> {
        let body = JSON.stringify(user);
        let options = new RequestOptions({ headers: this.headers });

        let api = this.api + AuthCache.API_PATH().users + '/' + user.uuid;
        return this.http.put(api, body, options).map(res => res.json());
    }

    /**
     * Create a new user
     */
    private postUser(user: User): Observable<User> {
        let body = JSON.stringify(user);
        let options = new RequestOptions({ headers: this.headers });

        let api = this.api + AuthCache.API_PATH().users;
        return this.http.post(api, body, options).map(res => res.json());
    }

    /**
     * Delete a user
     */
    private deleteUser(user: User): Observable<User> {
        let options = new RequestOptions({ headers: this.headers });

        let api = this.api + AuthCache.API_PATH().users + '/' + user.uuid;
        return this.http.delete(api, options).map(res => res.json());
    }

    /**
     * Get list of users
     */
    private getUsers(filters: any): Observable<any> {
        let cur_page = filters.cur_page;
        let role_id  = filters.role_id;
        let api = this.api + AuthCache.API_PATH().users +
            '?page=' + cur_page +
            '&role_id=' + role_id +
            '&per_page=' + PrefCache.getPerPage() +
            '&token=' + AuthCache.token();
        return this.http.get(api).map(res => res.json());
    }

    /**
     * Update users
     */
    private putUsers(users: User[]): Observable<User[]> {
        let body = JSON.stringify(users);
        let options = new RequestOptions({ headers: this.headers });

        let api = this.api + AuthCache.API_PATH().users_batch;
        return this.http.put(api, body, options).map(res => res.json());
    }

    /**
     * Delete users
     */
    private deleteUsers(users: User[]): Observable<User[]> {
        let body = JSON.stringify(users);
        let options = new RequestOptions({ headers: this.headers });

        let api = this.api + AuthCache.API_PATH().users_batch;
        // TODO: http.delete can't have a body
        console.error("Unimplemented: deleteUsers");
        return this.http.delete(api, options).map(res => res.json());
    }

    private searchUsers(query: string): Observable<User[]> {
        let api = this.api + AuthCache.API();
        return this.http.get(api).map(res => res.json());
    }


    private getUserDomains(uuid: string): Observable<Domain[]> {
        let api = this.api + AUTH.domains + '/' + uuid + '&token=' + AuthCache.token();
        return this.http.get(api).map(res => res.json());
    }

    private postUserDomains(user: User) {
        let body = ''; //JSON.stringify(user.domains);
        let options = new RequestOptions({ headers: this.headers });

        let api = this.api + AUTH.domains + '/' + user.uuid;
        return this.http.post(api, body, options);
    }
}
