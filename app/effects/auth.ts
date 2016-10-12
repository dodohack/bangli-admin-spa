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
import { CmsAttrActions }             from '../actions';
import { User }                       from '../models';
import { AlertActions }               from '../actions';
import { AuthState }                  from '../reducers/auth';

var jwtDecode = require('jwt-decode');

@Injectable()
export class AuthEffects {
    auth: AuthState;

    constructor (private actions$: Actions,
                 private http: Http) {}

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


    /**
     * Step 2. Kick action to login to application server
     */
    @Effect() loginSuccess$ = this.actions$.ofType(AuthActions.LOGIN_SUCCESS)
        .map(action => AuthActions.loginDomain(action.payload));

    @Effect() loginFail$ = this.actions$.ofType(AuthActions.LOGIN_FAIL)
        .map(action => AlertActions.error('登录授权服务器失败或者无权限使用后台!'));


    /**
     * Step 3. Switch or login to default application server
     */
    @Effect() loginDomain$ = this.actions$.ofType(AuthActions.LOGIN_DOMAIN)
        .switchMap(action => this.loginDomain(action.payload.auth, action.payload.domain_key)
            .map(user => AuthActions.loginDomainSuccess(user))
            .catch(() => Observable.of(AuthActions.loginDomainFail()))
        );

    /**
     * Step 4. Preload domain specific cms/shop attributes data
     */
    @Effect() cacheAttr$ = this.actions$.ofType(AuthActions.LOGIN_DOMAIN_SUCCESS)
        .map(() => {
            CmsAttrActions.loadAll();
            console.error("TODO: Kick ShopAttrActions.loadAll() for huluwa!");
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
    private loginDomain(auth: AuthState, domain_key: string): Observable<User> {
        // Use default domain key if exist
        let key = auth.key;
        // Use specified domain key if exist
        if (domain_key) key = domain_key;
        // If no domain key is given, try the first domain available
        if (!key) key = auth.domains[0].key;

        // Cache currently logged in domain so that each of the following
        // network request knows which server to contact.
        sessionStorage.setItem('key', key);

        let uuid = '';
        if (auth.jwt)
            uuid = auth.jwt.sub;
        else
            uuid = jwtDecode(auth.token).sub;

        let api = APIS[key] + API_PATH.users + '/' + uuid + '?token=' + auth.token;

        // Login user into specific application domain, user profile returned
        return this.http.get(api).map(res => res.json());
    }
}
