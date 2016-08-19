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
    loginAuth$ = this.actions$
        // Listen for the 'LOGIN' action
        .ofType(AuthActions.LOGIN)
        // Map the payload into JSON to use as the request body
        //.map(action => JSON.stringify(action.payload))
        .map(action => 'email=' + action.payload.email + '&password=' + action.payload.password)
        // Post login request
        .switchMap(payload => this.login(payload))
        // If success, dispatch success action wit result
        .map(user => AuthActions.loginComplete(user))
        // If request fails, dispatch failed action
        .catch(ret => {
            return Observable.of(
                {type: AlertActions.ERROR, payload: '邮箱或密码错误!'},
                AuthActions.loginFail()
            );
        });
    
    
    

    //////////////////////////////////////////////////////////////////////////
    // Private helper functions
    // FIXME: As injecting our own services into ngrx/effect causes error
    // 'Cannot instantiate cyclic dependency', so we firstly put the impl't of
    // services here. See https://github.com/ngrx/effects/issues/12 as well

    private login (form: string): Observable<User> {
        console.log("AuthService::login user: ", form);
        return this.post(AUTH.login, form);
    }

    private post(api: string, body: string)
    {
        //let headers = new Headers({'Content-Type': 'application/json'});
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });

        // Post data and convert server response to JSON format
        return this.http.post(api, body, options).map(res => res.json());
    }
}
