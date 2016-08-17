/**
 * This login process uses ngrx/store, once this is working, old login will
 * be deprecated.
 */
import { Component } from '@angular/core';
import { Router }    from '@angular/router';
import { Store }     from '@ngrx/store';

import { AppState }    from '../reducers';
import { AuthService } from '../service';
import { Login }       from '../models';
import {AuthActions} from "../actions/auth";
import {User} from "../models/user";
import {Observable} from "rxjs/Rx";

let t = require('./login.html');
@Component({
    template: t
})
export class LoginPage
{
    form: Login;
    auth: Observable<any>;
    constructor(private store: Store<AppState>) {
        this.auth = store.select('auth');
    }

    onSubmit() {
        this.store.dispatch({type: AuthActions.LOGIN, payload: this.form});
    }
}