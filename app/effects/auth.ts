/**
 * Auth related side effect, triggered by listening on the
 * changes of Redux actions.
 */
import { Injectable }                      from '@angular/core';
import { Http, Headers, RequestOptions }   from '@angular/http';
import { Effect, Actions }                 from '@ngrx/effects';
import { Observable }                      from 'rxjs/Observable';

import { CacheSingleton }          from './cache.singleton';
import { AUTH, APIS, API_PATH }    from '../api';
import { AuthActions }             from '../actions';
import { AuthUser, User }          from '../models';
import { AlertActions }            from '../actions';

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
    @Effect() login$ = this.actions$.ofType(AuthActions.LOGIN)
        .switchMap(action => this.login(action.payload)
            .map(user => {
                if (user.domains.length)
                    return AuthActions.loginSuccess(user);
                else
                    return AuthActions.loginFailNoDomain();
            })
            .catch(() => Observable.of(AuthActions.loginFail()))
        );

    /**
     * Step 2. Switch or login to default application server
     */
    @Effect() loginDomain$ = this.actions$.ofType(AuthActions.LOGIN_DOMAIN)
        .switchMap(action => this.loginDomain(action.payload)
            .map(user => {
                if (this.hasDashboardUserRole(user))
                    return AuthActions.loginDomainSuccess(user);
                else
                    return AuthActions.loginDomainFailNoPermission();
            })
            .catch(() => Observable.of(AuthActions.loginDomainFail()))
        );

    @Effect() loginFail1$ = this.actions$.ofType(AuthActions.LOGIN_FAIL)
        .map(action => AlertActions.error('登录授权服务器失败!'));

    @Effect() loginFail2$ = this.actions$.ofType(AuthActions.LOGIN_FAIL_NO_DOMAIN)
        .map(action => AlertActions.error('无权使用任何站点,请联系管理员开通权限!'));

    /**
     * Clean session cache for logout 
     */
    @Effect() logout$ = this.actions$.ofType(AuthActions.LOGOUT)
        .map(() => this.logout());

    /**
     * Each app server returns the domainKey so we know which server is
     * returned, we use the domainKey to update corresponding latency entry
     */
    @Effect() pingDomains$ = this.actions$.ofType(AuthActions.PING_DOMAINS)
        .switchMap(() => this.pingDomains()
            .map(domainKey => AuthActions.pingDomainSuccess(domainKey))
            .catch(() => Observable.of(AuthActions.pingDomainFail())));


    @Effect() loginDomainFail1$ = this.actions$.ofType(AuthActions.LOGIN_DOMAIN_FAIL)
        .map(res => AlertActions.error('登录应用服务器失败!'));

    @Effect() loginDomainFail2$ = this.actions$.ofType(AuthActions.LOGIN_DOMAIN_FAIL_NO_PERMISSION)
        .map(res => AlertActions.error('你无权管理此站点,请联系管理员开通权限!'));

    /**
     * Register a user to auth server
     */
    @Effect() register$ = this.actions$.ofType(AuthActions.REGISTER)
        .switchMap(action => this.register(action.payload)
            .map(res => AuthActions.registerSuccess(res))
            .catch(() => Observable.of(AuthActions.registerFail())));

    @Effect() registerSuccess$ = this.actions$.ofType(AuthActions.REGISTER_SUCCESS)
        .map(action => AlertActions.success("注册成功,请联系管理员开通后台权限"));

    @Effect() registerFail$ = this.actions$.ofType(AuthActions.REGISTER_FAIL)
        .map(action => AlertActions.error("注册失败"));


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
        return this._post(AUTH.login, JSON.stringify(user));
    }

    /**
     * Register a user to auth server with given email and password
     */
    private register(user: AuthUser): Observable<AuthUser> {
        return this._post(AUTH.register, JSON.stringify(user));
    }
    
    private logout(): Observable<boolean> {
        this.cache.clean();
        return Observable.of(true);
    }

    /**
     * Login user into specified application server by domain_key
     */
    private loginDomain(key: string = undefined): Observable<User> {

        // Cache the key for current session scope
        if (key) this.cache.key = key;
        
        // Get current user uuid from decoded token
        let uuid = this.cache.jwt.sub;

        // Form an API
        let api = APIS[this.cache.key] + API_PATH.login + '?token=' + this.cache.token;

        // Login user into specific application domain, user profile returned
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
