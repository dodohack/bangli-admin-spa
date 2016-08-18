/**
 * Redux effects - Auth related side effect, triggered by listening on the
 * changes of Redux actions.
 */
import { Injectable, Optional, SkipSelf }  from '@angular/core';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';
import { Observable }                      from 'rxjs/Observable';

import { AppState }    from '../reducers';
import { AuthActions } from '../actions';
import { AuthService } from '../services';
import { User }        from "../models";

@Injectable()
export class AuthEffects {
    constructor (private update$: StateUpdates<AppState>,
                 /* This breaks the circular DI problem */
                 /*@SkipSelf() @Optional() */ private srv: AuthService) {}

    @Effect()
    loginAuth$ = this.update$.whenAction(AuthActions.LOGIN)
        .map<User>(toPayload)
        .switchMap(user => this.srv.login(user.loginForm))
        .map(user => AuthActions.loginComplete(user))
        .catch(() => Observable.of(AuthActions.loginFail()));
}
