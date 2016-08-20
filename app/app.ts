/**
 * This is the entry point of admin.huluwa.uk
 */

import { Component }         from '@angular/core';
import { Router }            from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { UserPreference }    from './preference';
import { AppState }          from './reducers';
import { AuthActions }       from './actions';
import { Alert }             from './models';

import { Topbar }            from './directives';

@Component({
    selector: 'admin-spa',
    template: require('./app.html')
})
export class App
{
    /* TODO: This array will grow large, need to clean it periodically */
    alerts$: Observable<Alert[]>;

    payload: any; // A user object if user is logged in
    auth$: Observable<any>;

    constructor(private store: Store<AppState>,
                private router: Router) {
        this.alerts$ = store.select('alerts');

        this.auth$ = store.select('auth');
        this.auth$.subscribe(payload => this.payload = payload);
    }
    
    logout() { this.store.dispatch(AuthActions.logout()); }
    switchDomain($event) {
        this.payload.domain_key = $event;
        this.store.dispatch(AuthActions.switchDomain(this.payload)); 
    }

    get isLoggedIn() { return this.payload.token ? true : false; }

    get toggleSidebar() { return UserPreference.toggleSidebar(); }
}
