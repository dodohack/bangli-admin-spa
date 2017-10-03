import { Injectable }                    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Effect, Actions }               from '@ngrx/effects';
import { Observable }                    from 'rxjs/Observable';

import { CacheSingleton } from './cache.singleton';
import { AuthUser, User } from '../models';
import { Domain }         from '../models';
import { APIS }           from '../api';
import { API_PATH, AUTH } from '../api';

import * as UA  from '../actions/user';
import * as AA from '../actions/alert';

@Injectable()
export class UserEffects {
    cache = CacheSingleton.getInstance();

    constructor(private actions$: Actions,
                private http: Http) { }

    get headers() {
        return new Headers({
            'Authorization': 'Bearer ' + this.cache.token,
            'Content-Type': 'application/json'
        });
    }


    @Effect() search$ = this.actions$.ofType(UA.SEARCH)
        .map((action: any) => JSON.stringify(action.payload))
        .filter(query => query !== '')
        .switchMap(query => this.searchUsers(query)
            .map(users => new UA.SearchComplete(users))
            .catch(() => Observable.of(new UA.LoadUserFail()))
        );

    @Effect() clearSearch$ = this.actions$.ofType(UA.SEARCH)
        .map((action: any) => JSON.stringify(action.payload))
        .filter(query => query === '')
        .mapTo(new UA.SearchComplete([]));

    @Effect() loadUsers$ = this.actions$.ofType(UA.LOAD_USERS)
        .switchMap((action: any) => this.getUsers(action.payload)
            .map(users => new UA.LoadUsersSuccess(users))
            .catch(() => Observable.of(new UA.LoadUsersFail()))
        );

    @Effect() loadUsersScroll$ = this.actions$.ofType(UA.LOAD_USERS_ON_SCROLL)
        .switchMap((action: any) => this.getUsers(action.payload)
            .map(users => new UA.LoadUsersOnScrollSuccess(users))
            .catch(() => Observable.of(new UA.LoadUsersOnScrollFail()))
        );

    @Effect() loadUser$ = this.actions$.ofType(UA.LOAD_USER)
        .switchMap((action: any) => this.getUser(action.payload)
            .map(user => new UA.LoadUserSuccess(user))
            .catch(() => Observable.of(new UA.LoadUserFail()))
        );

    /* Update user app server related fields */
    @Effect() updateUser$ = this.actions$.ofType(UA.SAVE_USER)
        .switchMap((action: any) => this.putUser(action.payload)
            .map(user => new UA.SaveUserSuccess(user))
            .catch(() => Observable.of(new UA.SaveUserFail()))
        );

    /* Load domains of user can manage */
    @Effect() loadAuthUser$ = this.actions$.ofType(UA.LOAD_AUTH_USER)
        .switchMap((action: any) => this.getAuthUser(action.payload)
            .map(res => new UA.LoadAuthUserSuccess({domains: res.domains, user: res.user}))
            .catch(() => Observable.of(new UA.LoadAuthUserFail()))
        );

    /* Update user auth server related fields */
    @Effect() updateAuthUser$ = this.actions$.ofType(UA.SAVE_AUTH_USER)
        .switchMap((action: any) => this.putAuthUser(action.payload)
            .map(res => new UA.SaveAuthUserSuccess(res))
            .catch(() => Observable.of(new UA.SaveAuthUserFail()))
        );

    @Effect() updateUOk$ = this.actions$.ofType(UA.SAVE_USER_SUCCESS)
        .map(() => new AA.Success("成功保存用户信息到应用服务器"));

    @Effect() updateAUOk$ = this.actions$.ofType(UA.SAVE_AUTH_USER_SUCCESS)
        .map(() => new AA.Success("成功保存用户信息到授权服务器"));

    @Effect() updateUFail$ = this.actions$.ofType(
        UA.SAVE_USER_FAIL,
        UA.SAVE_AUTH_USER_FAIL
    ).map(() => new AA.Error("保存用户信息失败"));

    /////////////////////////////////////////////////////////////////////////
    // Http functions


    /**
     * Get single user from API server by id or uuid
     */
    private getUser(id: string | number): Observable<User> {
        let api = APIS[this.cache.key] + API_PATH.users
            + '/' + id + '?token=' + this.cache.token;
        return this.http.get(api).map(res => res.json());
    }


    /**
     * Get single user from Auth server by uuid
     * The http request returns domains + user.
     */
    private getAuthUser(uuid: string): Observable<any> {
        let api = AUTH.user + '/' + uuid + '?token=' + this.cache.token;
        return this.http.get(api).map(res => res.json());
    }

    /**
     * Update single user
     */
    private putUser(user: User): Observable<User> {
        let body = JSON.stringify(user);
        let options = new RequestOptions({ headers: this.headers });

        let api = APIS[this.cache.key] + API_PATH.users + '/' + user.uuid;
        return this.http.put(api, body, options).map(res => res.json());
    }

    /**
     * Update auth user
     */
    private putAuthUser(user: AuthUser): Observable<any> {
        let body = JSON.stringify(user);
        let options = new RequestOptions({ headers: this.headers });

        let api = AUTH.user + '/' + user.uuid;
        return this.http.put(api, body, options).map(res => res.json());
    }

    /**
     * Create a new user
     */
    private postUser(user: User): Observable<User> {
        let body = JSON.stringify(user);
        let options = new RequestOptions({ headers: this.headers });

        let api = APIS[this.cache.key] + API_PATH.users;
        return this.http.post(api, body, options).map(res => res.json());
    }

    /**
     * Delete a user
     */
    private deleteUser(user: User): Observable<User> {
        let options = new RequestOptions({ headers: this.headers });

        let api = APIS[this.cache.key] + API_PATH.users + '/' + user.uuid;
        return this.http.delete(api, options).map(res => res.json());
    }

    /**
     * Get list of users
     */
    private getUsers(filters: any): Observable<any> {
        let cur_page = filters.cur_page;
        let role_id  = filters.role_id;
        let api = APIS[this.cache.key] + API_PATH.users +
            '?page=' + cur_page +
            '&role_id=' + role_id +
            '&per_page=' + 20 +
            '&token=' + this.cache.token;
        return this.http.get(api).map(res => res.json());
    }

    /**
     * Update users
     */
    private putUsers(users: User[]): Observable<User[]> {
        let body = JSON.stringify(users);
        let options = new RequestOptions({ headers: this.headers });

        let api = APIS[this.cache.key] + API_PATH.users_batch;
        return this.http.put(api, body, options).map(res => res.json());
    }

    /**
     * Delete users
     */
    private deleteUsers(users: User[]): Observable<User[]> {
        let body = JSON.stringify(users);
        let options = new RequestOptions({ headers: this.headers });

        let api = APIS[this.cache.key] + API_PATH.users_batch;
        // TODO: http.delete can't have a body
        console.error("Unimplemented: deleteUsers");
        return this.http.delete(api, options).map(res => res.json());
    }

    private searchUsers(query: string): Observable<User[]> {
        let api = APIS[this.cache.key] + API_PATH.users + '?query=' + query
            + '&token=' + this.cache.token;
        return this.http.get(api).map(res => res.json());
    }

}
