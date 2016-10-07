/**
 * Auth related side effect, triggered by listening on the
 * changes of Redux actions.
 */
import { Injectable }                      from '@angular/core';
import { Http, Headers, RequestOptions }   from '@angular/http';
import { Effect, Actions }                 from '@ngrx/effects';
import { Observable }                      from 'rxjs/Observable';

import { AUTH, APIS, API_PATH }       from '../api';
import { AuthActions }                from '../actions';
import { User }                       from '../models';
import { AlertActions }               from '../actions';

var jwtDecode = require('jwt-decode');

@Injectable()
export class AuthEffects {
    constructor (private actions$: Actions,
                 private http: Http) {}

    @Effect() login$ = this.actions$.ofType(AuthActions.LOGIN)
        .map(action => JSON.stringify(action.payload))
        .switchMap(payload => this.login(payload)
            .map(user => AuthActions.loginSuccess(user))
            .catch(() => Observable.of(AuthActions.loginFail()))
        );

    /* Dispatch action LOGIN_DOMAIN immediately after LOGIN_SUCCESS,
     * NOTE: This effects may happen before LOGIN_SUCCESS reducer */
    @Effect() loginSuccess$ = this.actions$.ofType(AuthActions.LOGIN_SUCCESS)
        .map(action => AuthActions.loginDomain(action.payload));

    @Effect() loginFail$ = this.actions$.ofType(AuthActions.LOGIN_FAIL)
        .map(action => AlertActions.error('登录授权服务器失败!'));

    /* Triggers on user login or manually switch domain */
    @Effect() loginDomain$ = this.actions$.ofType(AuthActions.LOGIN_DOMAIN)
        .switchMap(action => this.loginDomain(action.payload)
            .map(user => AuthActions.loginDomainSuccess(user))
            .catch(() => Observable.of(AuthActions.loginDomainFail()))
        );

    /**
     * TODO:
     * 1. Redirect user to page that will send out an register request
     *    to application server.
     * 2. Display an instruction to let user to tell admin assign application
     *    server dashboard user permission to him.
     */
    @Effect() loginDomainFail$ = this.actions$.ofType(AuthActions.LOGIN_DOMAIN_FAIL)
        .map(action => AlertActions.error('登录应用服务器失败!'));

    
    //////////////////////////////////////////////////////////////////////////
    // Private helper functions

    private _post(api: string, body: string) {
        let headers = new Headers({'Content-Type': 'application/json'});
        //let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });

        // Post data and convert server response to JSON format
        return this.http.post(api, body, options).map(res => res.json());
    }    
    
    // Login a user with given email and password
    private login(form: string): Observable<User> {
        return this._post(AUTH.login, form);
    }

    // Login user into specified API domain
    // We are doing extra work in this function is because this function
    // may happens before reducer LOGIN_SUCCESS, so some data may not ready.
    private loginDomain(auth: any): Observable<User> {
        if (!auth.token)
            return Observable.throw('You should have get a token');

        let key  = '';
        let uuid = '';

        if (!auth.key && !auth.domains)
            return Observable.throw('No permission to manage any domain');

        // Get first domain as default
        if (!auth.key)
            key = auth.domains[0].key;
        else
            key = auth.key;

        if (auth.jwt)
            uuid = auth.jwt.sub;
        else
            uuid = jwtDecode(auth.token).sub;

        // We can't use AuthCache here, cause it is not ready at user login
        let api = APIS[key] + API_PATH.users
            + '/' + uuid + '?token=' + auth.token;

        console.log("KEY IS: ", key);
        console.log("LOGIN INTO DOMAIN: ", api);

        // Get current user domain specific profile
        return this.http.get(api).map(res => res.json());
    }
}
