import { Injectable } from '@angular/core';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { AppState }    from '../reducers';
import { AuthActions } from '../actions';
import { NewAuthService } from '../services';

/* FIXME: Merge login, register, user into single model */
import {User} from "../models/user";

@Injectable()
export class AuthEffects {
    constructor (private update$: StateUpdates<AppState>,
                 private srv:     NewAuthService) {}

    @Effect()
    loginAuth$ = this.update$.whenAction(AuthActions.LOGIN)
        .map<User>(toPayload)
        .switchMap(user => this.srv.login(user))
        .map(user => AuthActions.loginComplete(user))
        .catch(() => Observable.of(AuthActions.loginFail([])));
}
