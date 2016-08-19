/**
 * This is the entry point of admin.huluwa.uk
 */

import { Component }         from '@angular/core';
import { Router }            from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { UserPreference }    from './preference';
import { AppState }          from './reducers';
import { Alert }             from './models';

let t = require('./app.html');
@Component({
    selector: 'admin-spa',
    template: t
})
export class App
{
    /* TODO: This array will grow large, need to clean it periodically */
    alerts$: Observable<Alert[]>;

    token: string = '';
    auth$: Observable<any>;

    constructor(private store: Store<AppState>,
                private router: Router) {
        this.alerts$ = store.select('alerts');

        this.auth$ = store.select('auth');
        this.auth$.subscribe(payload => this.token = payload.token);
    }

    get isLoggedIn() { return this.token ? true : false; }

    get toggleSidebar() { return UserPreference.toggleSidebar(); }
}
