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

    user: any; // A user object if user is logged in
    pref: Preference;

    auth$: Observable<any>;
    pref$: Observable<any>;

    constructor(private store: Store<AppState>,
                private router: Router) {}

    ngOnInit() {
        this.alerts$ = this.store.select<Alert[]>('alerts');
        this.auth$   = this.store.select('auth');
        this.pref$   = this.store.select('pref');

        /* TODO: THIS IS A HACK!
         * TODO: Do we have a better solution to get the authentication info
         * TODO: globally, especially the 'token' and 'domain_key'
         */
        this.auth$.filter(user => user.token ? true : false)
            .subscribe(user => {
            console.log("APP INIT: payload is: ", user);
            this.user = user;
            AuthCache.setToken(this.user.token);
            AuthCache.setDecodedToken(this.user.payload);
            AuthCache.setDomainKey(this.user.domain_key);
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
