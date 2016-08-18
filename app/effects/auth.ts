/**
 * Redux effects - Auth related side effect, triggered by listening on the
 * changes of Redux actions.
 */
import { Injectable }                      from '@angular/core';
import { Router }                          from '@angular/router';
import { Http, Headers, RequestOptions }   from '@angular/http';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';
import { Observable }                      from 'rxjs/Observable';

import { AppState }    from '../reducers';
import { AuthActions } from '../actions';
//import { NewAuthService } from '../services';
import { AUTH }        from '../api';
import { User }        from "../models";

@Injectable()
export class AuthEffects {
    /* FIXME: ngrx/effect is bugged with service injection, we can not inject
     * our own service here yet.
     * See latest comment of https://github.com/ngrx/effects/issues/12
     * */
    constructor (private update$: StateUpdates<AppState>,
                 //private router: Router,
                 private http: Http
                 /*private srv: NewAuthService*/) {}

    /**
     * This effect triggers when AuthActions.LOGIN is fired
     */
    @Effect()
    loginAuth$ = this.update$.whenAction(AuthActions.LOGIN)
        .map<User>(toPayload)
        .switchMap(user => this.login(user.loginForm))
        .map(user => AuthActions.loginComplete(user))
        .catch(() => Observable.of(AuthActions.loginFail()));

    //////////////////////////////////////////////////////////////////////////
    // Private helper functions
    // FIXME: As injecting our own services into ngrx/effect causes error
    // 'Cannot instantiate cycli dependency', so we firstly put the impl't of
    // services here. See https://github.com/ngrx/effects/issues/12 as well

    private login (form: string): Observable<User> {
        console.log("AuthService::login user: ", form);
        return this.post(AUTH.login, form);
    }

    private post(api: string, body: string)
    {
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });

        // Post data and convert server response to JSON format
        return this.http.post(api, body, options).map(res => res.json());
    }
}
