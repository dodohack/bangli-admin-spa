/**
 * This is the entry point of admin.huluwa.uk
 */

import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { AuthCache }         from './auth.cache';
import { PrefCache }         from './pref.cache';
import { AppState }          from './reducers';
import { AuthState }         from './reducers/auth';
import { isDashboardUser }   from './reducers';
import { AuthActions }       from './actions';
import { PreferenceActions } from './actions';
import { Alert }             from './models';
import { Preference }        from "./models";


@Component({
    selector: 'admin-spa',
    template: require('./app.html')
})
export class App implements OnInit
{
    /* TODO: This array will grow large, need to clean it periodically */
    alerts$: Observable<Alert[]>;

    auth: AuthState;
    pref: Preference;

    constructor(private store: Store<AppState>,
                private router: Router) {}

    ngOnInit() {
        this.alerts$ = this.store.select<Alert[]>('alerts');

        /* TODO: THIS IS A HACK!
         * TODO: Do we have a better solution to get the authentication info
         * TODO: globally, especially the 'token' and 'domain_key'
         */
        this.store.select<AuthState>('auth').subscribe(auth => {
            console.log("APP INIT: authState is: ", auth);
            this.auth = auth;
            if (auth.token) {
                AuthCache.cacheToken(auth.token);
                AuthCache.cacheJwt(auth.jwt);
                AuthCache.cacheDomainKey(auth.key);
            } else {
                AuthCache.clean();
            }
        });
        
        this.store.select<Preference>('pref').subscribe(pref => {
            this.pref = pref;
            PrefCache.setPerPage(this.pref.listItemCount.toString());
        });
    }

    get isLoggedIn() { return this.store.let<boolean>(isDashboardUser()); }

    logout() {
        this.store.dispatch(AuthActions.logout());
        // FIXME: Should we have something send back from sideeffect??
        this.router.navigate(['/login']);
    }

    /* Login user into selected domain */
    loginDomain($event) { this.store.dispatch(AuthActions.loginDomain($event)); }
    toggleSidebar($event) { this.store.dispatch(PreferenceActions.toggleSidebar()); }
}
