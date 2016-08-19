/**
 * This is the entry point of admin.huluwa.uk
 */

import { Component }         from '@angular/core';
import { Router }            from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

//import { AuthService }       from './services';
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

    constructor(/*private authService: AuthService,*/
                private store: Store<AppState>,
                private router: Router) {
        this.alerts$ = store.select('alerts');
    }

    get isLoggedIn() { return false; /*return this.authService.isLoggedIn;*/ }
    get toggleSidebar() { return UserPreference.toggleSidebar(); }
}
