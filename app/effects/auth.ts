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
    // key index of ping service, we only ping 1 app server at a time before
    // we can use Observable.mergeDelayError.
    keyIndex: number;

    constructor (private actions$: Actions,
                 private http: Http) {
        super();
        this.keyIndex = 0;
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
     * Each app server returns the domainKey so we know which server is
     * returned, we use the domainKey to update corresponding latency entry
     */
    @Effect() pingDomains$ = this.actions$.ofType(AuthActions.PING_DOMAINS)
        .switchMap(() => this.pingDomains()
            .map(domainKey => AuthActions.pingDomainSuccess(domainKey))
            .catch(() => Observable.of(AuthActions.pingDomainFail())));


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

    /**
     * Test connectivity of each available domain, the server returns key as well
     */
    private pingDomains(): Observable<string> {
        if (this.keyIndex >= this.keys.length) this.keyIndex = 0;

        let key = this.keys[this.keyIndex++];

        console.log("Ping server: ", key, ", idx: ", this.keyIndex);

        return this.http.get(APIS[key]+ API_PATH.ping + '?key=' + key)
            .map(res => res.json());

        // mergeDelayError postpone the errors to the end so it will not cancel
        // the previous requests, but it is currently not defined yet
        /*
        return Observable.mergeDelayError(
            this.http.get(APIS.huluwa_uk + API_PATH.ping + '?key=huluwa_uk'),
            this.http.get(APIS.bangli_uk + API_PATH.ping + '?key=bangli_uk'),
            this.http.get(APIS.bangli_us + API_PATH.ping + '?key=bangli_us')
        ).map(res => res.json());
        */
    }
}
