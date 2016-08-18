/**
 * This login process uses ngrx/store, once this is working, old login will
 * be deprecated.
 */
import { Component }  from '@angular/core';
import { Router }     from '@angular/router';
import { Store }      from '@ngrx/store';
import { Observable } from "rxjs/Rx";

import { AppState }    from '../reducers';
import { AuthService } from '../service';
import { User }        from '../models';
import {AuthActions}   from "../actions/auth";


let t = require('./login.html');
@Component({
    template: t
})
export class LoginPage
{
    user: User = new User;
    auth: Observable<any>;
    constructor(private store: Store<AppState>) {
        this.auth = store.select('auth');
    }

    onSubmit() {
        this.store.dispatch({type: AuthActions.LOGIN, payload: this.user.loginForm});
    }
}
