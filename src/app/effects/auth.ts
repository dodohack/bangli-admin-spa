/**
 * Auth related side effect, triggered by listening on the
 * changes of Redux actions.
 */
import { Injectable }                      from '@angular/core';
import { Http, Headers, RequestOptions }   from '@angular/http';
import { Effect, Actions }                 from '@ngrx/effects';
import { Action }                          from '@ngrx/store';
import { Observable }                      from 'rxjs/Observable';

import { CacheSingleton }          from './cache.singleton';
import { AUTH, APIS, API_PATH }    from '../api';
import { AuthUser, User }          from '../models';

import * as AuthA     from '../actions/auth';
import * as AlertA    from '../actions/alert';

@Injectable()
export class AuthEffects {
    // key index of ping service, we only ping 1 app server at a time before
    // we can use Observable.mergeDelayError.
    keyIndex: number;
    
    cache = CacheSingleton.getInstance();

    constructor (private actions$: Actions,
                 private http: Http) {
        this.keyIndex = 0;
    }

    /**
     * Step 1. Login authentication server
     */
    @Effect() login$: Observable<Action> = this.actions$.ofType(AuthA.LOGIN)
        .switchMap((action: any) => this.login(action.payload)
            .map(user => {
                if (user.domains.length)
                    return new AuthA.LoginSuccess(user);
                else
                    return new AuthA.LoginFailNoDomain();
            })
            .catch(() => Observable.of(new AuthA.LoginFail()))
        );

    /**
     * Step 2. Switch or login to default application server
     */
    @Effect() loginDomain$: Observable<Action> = this.actions$.ofType(AuthA.LOGIN_DOMAIN)
        .switchMap((action: any) => this.loginDomain(action.payload)
            .map(res => {
                if (this.hasDashboardUserRole(res.user)) {
                    // Clean previous cache when login domain success
                    this.cache.clean();
                    return new AuthA.LoginDomainSuccess(res);
                } else {
                    return new AuthA.LoginDomainFailNoPermission();
                }
            })
            .catch(() => Observable.of(new AuthA.LoginDomainFail()))
        );

    @Effect() loginFail1$: Observable<Action> = this.actions$.ofType(AuthA.LOGIN_FAIL)
        .map((action: any) => new AlertA.Error('登录授权服务器失败!'));

    @Effect() loginFail2$: Observable<Action> = this.actions$.ofType(AuthA.LOGIN_FAIL_NO_DOMAIN)
        .map((action: any) => new AlertA.Error('无权使用任何站点,请联系管理员开通权限!'));

    /**
     * Clean session cache for logout 
     */
    @Effect() logout$: Observable<Action> = this.actions$.ofType(AuthA.LOGOUT)
        .map(() => {this.logout(); return new AuthA.LogoutSuccess();});

    /**
     * Each app server returns the domainKey so we know which server is
     * returned, we use the domainKey to update corresponding latency entry
     */
    @Effect() pingDomains$: Observable<Action> = this.actions$.ofType(AuthA.PING_DOMAINS)
        .switchMap(() => this.pingDomains()
            .map(domainKey => new AuthA.PingDomainSuccess(domainKey))
            .catch(() => Observable.of(new AuthA.PingDomainFail())));


    @Effect() loginDomainFail1$: Observable<Action> = this.actions$.ofType(AuthA.LOGIN_DOMAIN_FAIL)
        .map(res => new AlertA.Error('登录应用服务器失败!'));

    @Effect() loginDomainFail2$: Observable<Action> = this.actions$.ofType(AuthA.LOGIN_DOMAIN_FAIL_NO_PERMISSION)
        .map(res => new AlertA.Error('你无权管理此站点,请联系管理员开通权限!'));

    /**
     * Register a user to auth server
     */
    @Effect() register$: Observable<Action> = this.actions$.ofType(AuthA.REGISTER)
        .switchMap((action: any) => this.register(action.payload)
            .map(res => new AuthA.RegisterSuccess(res))
            .catch(() => Observable.of(new AuthA.RegisterFail())));

    @Effect() registerSuccess$: Observable<Action> = this.actions$.ofType(AuthA.REGISTER_SUCCESS)
        .map((action: any) => new AlertA.Success("注册成功,请联系管理员开通后台权限"));

    @Effect() registerFail$: Observable<Action> = this.actions$.ofType(AuthA.REGISTER_FAIL)
        .map((action: any) => new AlertA.Error("注册失败"));


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
    private login(user: AuthUser): Observable<AuthUser> {
        this.cache.clean();
        return this._post(AUTH.login, JSON.stringify(user));
    }

    /**
     * Register a user to auth server with given email and password
     */
    private register(user: AuthUser): Observable<AuthUser> {
        return this._post(AUTH.register, JSON.stringify(user));
    }
    
    private logout() {
        this.cache.clean();
    }

    /**
     * Login user into specified application server by domain_key
     */
    private loginDomain(key: string = undefined) {

        // Cache the key for current session scope
        if (key) this.cache.key = key;
        
        // Get current user uuid from decoded token
        let uuid = this.cache.jwt.sub;

        // Form an API
        let api = APIS[this.cache.key] + API_PATH.login + '?token=' + this.cache.token;

        // Login user into specific application domain, user profile +
        // img_server for the domain returned
        return this.http.get(api).map(res => res.json());
    }

    /**
     * Test connectivity of each available domain, the server returns key as well
     */
    private pingDomains() {
        if (this.keyIndex >= this.cache.keys.length) this.keyIndex = 0;

        let key = this.cache.keys[this.keyIndex++];
        if (key)
            return this.http.get(APIS[key]+ API_PATH.ping + '?key=' + key)
                .map(res => res.json());
        else
            return Observable.throw("No key is given");

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

    /**
     * Test a domain user can use dashboard or not
     */
    private hasDashboardUserRole(user: User) {
        switch (user.role.name) {
            case 'author':
            case 'editor':
            case 'shop_manager':
            case 'administrator':
                return true;
            default:
                return false;
        }
    }
}
