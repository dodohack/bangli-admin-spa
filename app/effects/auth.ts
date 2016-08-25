/**
 * Auth related side effect, triggered by listening on the
 * changes of Redux actions.
 */
import { Injectable }                      from '@angular/core';
import { Http, Headers, RequestOptions }   from '@angular/http';
import { Effect, Actions }                 from '@ngrx/effects';
import { Observable }                      from 'rxjs/Observable';

import { AuthActions }  from '../actions';
import { AUTH }         from '../api';
import { User }         from '../models';
import { AlertActions } from '../actions';
import { AuthCache }    from "../auth.cache";

@Injectable()
export class AuthEffects {
    constructor (private actions$: Actions,
                 private http: Http) {}

    @Effect() login$ = this.actions$.ofType(AuthActions.LOGIN)
        .map(action => JSON.stringify(action.payload))
        .switchMap(payload => this.login(payload))
        .map(user => AuthActions.loginSuccess(user))
        .catch(() => Observable.of(AuthActions.loginFail()));

    /* Triggers on app start or manually login into domain */
    @Effect() loginDomain$ = this.actions$.ofType(AuthActions.LOGIN_DOMAIN)
        .switchMap(action => this.loginDomain(action.payload))
        .map(user => AuthActions.loginDomainSuccess(user))
        .catch(() => Observable.of(AuthActions.loginDomainFail()));
    

    /**
     * Update default 'domain_key' from sessionStorage or set default from
     * current payload.
     * @type {Observable<R>}
     */
    /* FIXME: 1. payload should be stringified before storing */
    /* FIXME: 2. An action must be returned after this */
    /*
    @Effect()
    loginSuccess$ = this.actions$.ofType(AuthActions.LOGIN_SUCCESS)
        .map(action => {
            if (!sessionStorage.getItem('auth')) {
                sessionStorage.setItem('auth', action.payload);
            }
            return AuthActions.loginDone(user)
        });
        */

    /**
     * User logout: Send user jwt to server to add to blacklist
     * The localStorage 'auth' is automatically cleaned by ngrx-store-localstorage.
     * @type {Actions}
     */
    /*
    @Effect()
    logout$ = this.actions$.ofType(AuthActions.LOGOUT)
        .map(action => this.logout()));
    */

    //////////////////////////////////////////////////////////////////////////
    // Private helper functions

    private _post(api: string, body: string) {
        let headers = new Headers({'Content-Type': 'application/json'});
        //let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });

        // Post data and convert server response to JSON format
        return this.http.post(api, body, options).map(res => res.json());
    }    
    
    /* Login a user with given email and password */
    private login(form: string): Observable<User> {
        console.error("FIXME: This can only be triggered first time, LOGIN FORM: ", form);
        return this._post(AUTH.login, form);
    }

    /* Login user into specified API domain */
    private loginDomain(user: User): Observable<User> {
        // Get user role for thie given domain
        return this.http.get(AuthCache.API().role).map(res => res.json());
    }
}
