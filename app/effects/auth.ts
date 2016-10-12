/**
 * Auth related side effect, triggered by listening on the
 * changes of Redux actions.
 */
import { Injectable }                      from '@angular/core';
import { Http, Headers, RequestOptions }   from '@angular/http';
import { Effect, Actions }                 from '@ngrx/effects';
import { Observable }                      from 'rxjs/Observable';

import { BaseEffects }                from './effect.base';
import { AUTH, APIS, API_PATH }       from '../api';
import { AuthActions }                from '../actions';
import { CmsAttrActions }             from '../actions';
import { ShopAttrActions }            from '../actions';
import { User }                       from '../models';
import { AlertActions }               from '../actions';
import { AuthState }                  from '../reducers/auth';

var jwtDecode = require('jwt-decode');

@Injectable()
export class AuthEffects extends BaseEffects {
    constructor (private actions$: Actions,
                 private http: Http) {
        super();
    }

    /**
     * Step 1. Login authentication server
     */
    @Effect() login$ = this.actions$.ofType(AuthActions.LOGIN)
        .map(action => JSON.stringify(action.payload))
        .switchMap(payload => this.login(payload)
            .map(user => {
                if (user.domains)
                    return AuthActions.loginSuccess(user);
                else
                    return AuthActions.loginFail();
            })
            .catch(() => Observable.of(AuthActions.loginFail()))
        );


    @Effect() loginFail$ = this.actions$.ofType(AuthActions.LOGIN_FAIL)
        .map(action => AlertActions.error('登录授权服务器失败或者无权限使用后台!'));


    /**
     * Step 2. Switch or login to default application server
     */
    @Effect() loginDomain$ = this.actions$.ofType(AuthActions.LOGIN_DOMAIN)
        .switchMap(action => this.loginDomain(action.payload)
            .map(user => AuthActions.loginDomainSuccess(user))
            .catch(() => Observable.of(AuthActions.loginDomainFail()))
        );

    /**
     * Step 3. Preload domain specific cms/shop attributes data
     */
    @Effect() cacheAttr$ = this.actions$.ofType(AuthActions.LOGIN_DOMAIN_SUCCESS)
        .map(() => {
            if (this.key === 'huluwa_uk') ShopAttrActions.loadAll();
            return CmsAttrActions.loadAll();
        });

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
    //////////////////////////////////////////////////////////////////////////

    private _post(api: string, body: string) {
        let headers = new Headers({'Content-Type': 'application/json'});
        //let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });

        // Post data and convert server response to JSON format
        return this.http.post(api, body, options).map(res => res.json());
    }

    /**
     * Login a user with given email and password
     */
    private login(form: string): Observable<User> {
        return this._post(AUTH.login, form);
    }

    /**
     * Login user into specified application server by domain_key
     */
    private loginDomain(key: string): Observable<User> {
        // Cache the key into sessionStorage 'key'.
        this.key = key;

        // Get current user uuid from decoded token
        let uuid = this.jwt.sub;

        // Form an API
        let api = APIS[key] + API_PATH.users + '/' + uuid + '?token=' + this.token;

        // Login user into specific application domain, user profile returned
        return this.http.get(api).map(res => res.json());
    }
}
