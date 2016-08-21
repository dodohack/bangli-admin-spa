/**
 * This is the entry point of admin.huluwa.uk
 */

import { Component }         from '@angular/core';
import { Router }            from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { AppState }          from './reducers';
import { AuthActions }       from './actions';
import { PreferenceActions } from './actions';
import { Alert }             from './models';


@Component({
    selector: 'admin-spa',
    template: require('./app.html')
})
export class App
{
    /* TODO: This array will grow large, need to clean it periodically */
    alerts$: Observable<Alert[]>;

    payload: any; // A user object if user is logged in
    pref: any;

    auth$: Observable<any>;
    pref$: Observable<any>;

    constructor(private store: Store<AppState>,
                private router: Router) {
        
        this.alerts$ = store.select('alerts');
        this.auth$   = store.select('auth');
        this.pref$   = store.select('pref'); 
        
        this.auth$.subscribe(payload => this.payload = payload);
        this.pref$.subscribe(pref => this.pref = pref);
    }

    get isLoggedIn() { return this.payload.token ? true : false; }

    logout() {
        this.store.dispatch(AuthActions.logout());
        // FIXME: Should we have something send back from sideeffect??
        this.router.navigate(['/login']);
    }
    switchDomain($event) { this.store.dispatch(AuthActions.switchDomain($event)); }
    toggleSidebar($event) { this.store.dispatch(PreferenceActions.toggleSidebar()); }
}
