import { Injectable }                    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Effect, Actions }               from '@ngrx/effects';
import { Observable }                    from 'rxjs/Observable';

import { BaseEffects }      from './effect.base';
import { UserActions } from '../actions';
import { User }        from '../models';
import { Domain }      from '../models';
import { APIS }        from '../api';
import { API_PATH, AUTH } from '../api';

@Injectable()
export class UserEffects extends BaseEffects {
    constructor(private actions$: Actions,
                private http: Http) {
        super();
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
        .switchMap(action => this.getUsers(action.payload)
            .map(users => UserActions.loadUsersSuccess(users))
            .catch(() => Observable.of(UserActions.loadUsersFail()))
        );

    @Effect() loadUsersScroll$ = this.actions$.ofType(UserActions.LOAD_USERS_ON_SCROLL)
        .switchMap(action => this.getUsers(action.payload)
            .map(users => UserActions.loadUsersOnScrollSuccess(users))
            .catch(() => Observable.of(UserActions.loadUsersOnScrollFail()))
        );

    @Effect() loadUser$ = this.actions$.ofType(UserActions.LOAD_USER)
        .switchMap(action => this.getUser(action.payload)
            .map(user => UserActions.loadUserSuccess(user))
            .catch(() => Observable.of(UserActions.loadUserFail()))
        );

    /* Load domains of user can manage */
    @Effect() loadDomains$ = this.actions$.ofType(UserActions.LOAD_USER_DOMAINS)
        .switchMap(action => this.getUserDomains(action.payload)
            .map(domains => UserActions.loadUserDomainsSuccess(domains))
            .catch(() => Observable.of(UserActions.loadUserDomainsFail()))
        );

    /* Update domains of user can manage */
    @Effect() saveDomains$ = this.actions$.ofType(UserActions.SAVE_USER_DOMAINS)
        .switchMap(action => this.postUserDomains(action.payload)
            .map(res => UserActions.saveUserDomainsSuccess(res))
            .catch(() => Observable.of(UserActions.saveUserDomainsFail()))
        );

    /////////////////////////////////////////////////////////////////////////
    // Http functions


    /**
     * Get single user by id or uuid
     */
    private getUser(id: string | number): Observable<User> {
        let api = APIS[this.key] + API_PATH.users
            + '/' + id + '?token=' + this.token;
        return this.http.get(api).map(res => res.json());
    }


    /**
     * Update single user
     */
    private putUser(user: User): Observable<User> {
        let body = JSON.stringify(user);
        let options = new RequestOptions({ headers: this.headers });

        let api = APIS[this.key] + API_PATH.users + '/' + user.uuid;
        return this.http.put(api, body, options).map(res => res.json());
    }

    /**
     * Create a new user
     */
    private postUser(user: User): Observable<User> {
        let body = JSON.stringify(user);
        let options = new RequestOptions({ headers: this.headers });

        let api = APIS[this.key] + API_PATH.users;
        return this.http.post(api, body, options).map(res => res.json());
    }

    /**
     * Delete a user
     */
    private deleteUser(user: User): Observable<User> {
        let options = new RequestOptions({ headers: this.headers });

        let api = APIS[this.key] + API_PATH.users + '/' + user.uuid;
        return this.http.delete(api, options).map(res => res.json());
    }

    /**
     * Get list of users
     */
    private getUsers(filters: any): Observable<any> {
        let cur_page = filters.cur_page;
        let role_id  = filters.role_id;
        let api = APIS[this.key] + API_PATH.users +
            '?page=' + cur_page +
            '&role_id=' + role_id +
            '&per_page=' + 20 +
            '&token=' + this.token;
        return this.http.get(api).map(res => res.json());
    }

    /**
     * Update users
     */
    private putUsers(users: User[]): Observable<User[]> {
        let body = JSON.stringify(users);
        let options = new RequestOptions({ headers: this.headers });

        let api = APIS[this.key] + API_PATH.users_batch;
        return this.http.put(api, body, options).map(res => res.json());
    }

    /**
     * Delete users
     */
    private deleteUsers(users: User[]): Observable<User[]> {
        let body = JSON.stringify(users);
        let options = new RequestOptions({ headers: this.headers });

        let api = APIS[this.key] + API_PATH.users_batch;
        // TODO: http.delete can't have a body
        console.error("Unimplemented: deleteUsers");
        return this.http.delete(api, options).map(res => res.json());
    }

    private searchUsers(query: string): Observable<User[]> {
        let api = APIS[this.key] + API_PATH.users + '?query=' + query
            + '&token=' + this.token;
        return this.http.get(api).map(res => res.json());
    }


    private getUserDomains(uuid: string): Observable<Domain[]> {
        let api = AUTH.domains + '/' + uuid + '&token=' + this.token;
        return this.http.get(api).map(res => res.json());
    }

    private postUserDomains(user: User): Observable<any> {
        let body = ''; //JSON.stringify(user.domains);
        let options = new RequestOptions({ headers: this.headers });

        let api = AUTH.domains + '/' + user.uuid;
        return this.http.post(api, body, options);
    }
}
