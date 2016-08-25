/**
 * This is the entry point of admin.huluwa.uk
 */

import { Component }         from '@angular/core';
import { Router }            from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { AuthCache }         from './auth.cache';
import { PrefCache }         from './pref.cache';
import { AppState }          from './reducers';
import { isDashboardUser }   from './reducers';
import { AuthActions }       from './actions';
import { PreferenceActions } from './actions';
import { Alert }             from './models';
import { Preference }        from "./models";


@Component({
    selector: 'admin-spa',
    template: require('./app.html')
})
export class App
{
    /* TODO: This array will grow large, need to clean it periodically */
    alerts$: Observable<Alert[]>;

    user: any; // A user object if user is logged in
    pref: Preference;

    auth$: Observable<any>;
    pref$: Observable<any>;

    constructor(private store: Store<AppState>,
                private router: Router) {
        
        this.alerts$ = store.select('alerts');
        this.auth$   = store.select('auth');
        this.pref$   = store.select('pref'); 

        /* TODO: THIS IS A HACK!
         * TODO: Do we have a better solution to get the authentication info
         * TODO: globally, especially the 'token' and 'domain_key'
         */
        this.auth$.subscribe(payload => {
            this.user = payload;
            AuthCache.setToken(this.user.token);
            AuthCache.setDecodedToken(this.user.payload);
            AuthCache.setDomainKey(this.user.domain_key);
            // Login user into default domain
            this.store.dispatch(AuthActions.loginDomain(payload));
        });
        this.pref$.subscribe(pref => {
            this.pref = pref;
            PrefCache.setPerPage(this.pref.listItemCount.toString());
        });
    }

    get isLoggedIn() { return this.store.let(isDashboardUser()); }

    logout() {
        this.store.dispatch(AuthActions.logout());
        // FIXME: Should we have something send back from sideeffect??
        this.router.navigate(['/login']);
    }

    /* Login user into selected domain */
    loginDomain($event) { this.store.dispatch(AuthActions.loginDomain($event)); }
    toggleSidebar($event) { this.store.dispatch(PreferenceActions.toggleSidebar()); }
}
