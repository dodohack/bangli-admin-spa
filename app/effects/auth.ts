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

@Injectable()
export class AuthEffects {
    constructor (private actions$: Actions,
                 private http: Http) {}

    /**
     * This effect triggers when AuthActions.LOGIN is fired
     */
    @Effect()
    login$ = this.actions$.ofType(AuthActions.LOGIN)
        // Map the payload into JSON to use as the request body
        .map(action => JSON.stringify(action.payload))
        //.map(action => 'email=' + action.payload.email + '&password=' + action.payload.password)
        // Post login request
        .switchMap(payload => this.login(payload))
        // If success, dispatch success action wit result
        .map(user => AuthActions.loginSuccess(user))
        // If request fails, dispatch failed action
        .catch(() => Observable.of(AuthActions.loginFail()));

    /**
     * Update default 'domain_key' from sessionStorage or set default from
     * current payload.
     * @type {Observable<R>}
     */
    @Effect()
    loginSuccess$ = this.actions$.ofType(AuthActions.LOGIN_SUCCESS)
        .map(action => {
            if (!sessionStorage.getItem('auth')) {
                sessionStorage.setItem('auth', action.payload);
            }
        });

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

    /**
     * Update sessionStorage key 'domain_key'.
     * FIXME: We should have a ngrx-store-sessionstorage reducer
     * @type {Observable<R>}
     */
    @Effect()
    swtchDomain$ = this.actions$.ofType(AuthActions.SWITCH_DOMAIN)
        .map(action =>
            sessionStorage.setItem('auth', action.payload));



    /*
    @Effect()
    loginAuthFail$ = this.actions$
        // Listen for the 'LOGIN_FAIL' action
        .ofType(AuthActions.LOGIN_FAIL)
        .map(action => {
            console.log("Prevous action of LOGIN_FAIL is: ", action);
            // Reset the form
            // Dispatch an error message
            return Observable.of({type: AlertActions.ERROR, payload: '邮箱或密码错误!'});
        });
    */

    //////////////////////////////////////////////////////////////////////////
    // Private helper functions

    /**
     * Login a user with given email and password
     * @param form
     * @returns {Observable<R>}
     */
    private login (form: string): Observable<User> {
        console.log("AuthService::login user: ", form);
        return this.post(AUTH.login, form);
    }

    private post(api: string, body: string)
    {
        let headers = new Headers({'Content-Type': 'application/json'});
        //let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });

        // Post data and convert server response to JSON format
        return this.http.post(api, body, options).map(res => res.json());
    }
}
