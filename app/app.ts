/**
 * This is the entry point of admin.huluwa.uk
 */

import { Component }         from '@angular/core';
import { ViewContainerRef }  from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Router }            from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { AuthCache }         from './auth.cache';
import { PrefCache }         from './pref.cache';
import { AppState }          from './reducers';
import { AuthState }         from './reducers/auth';
import { isDashboardUser }   from './reducers';
import { AuthActions }       from './actions';
import { CmsAttrActions }    from './actions';
import { ShopAttrActions }   from './actions';
import { PreferenceActions } from './actions';
import { Alert }             from './models';
import { Preference }        from "./models";
import { Ping }              from './ping';

@Component({
    selector: 'admin-spa',
    template: require('./app.html')
})
export class App implements OnInit, OnDestroy
{
    /* TODO: This array will grow large, need to clean it periodically */
    alerts$: Observable<Alert[]>;

    // Subscriptions
    subAuth: any;
    subPref: any;

    auth: AuthState;
    pref: Preference;

    constructor(private viewContainerRef: ViewContainerRef,
                private store: Store<AppState>,
                private router: Router,
                private ping: Ping) {
    }

    ngOnInit() {
        this.alerts$ = this.store.select<Alert[]>('alerts');

        /* TODO: THIS IS A HACK!
         * TODO: Do we have a better solution to get the authentication info
         * TODO: globally, especially the 'token' and 'domain_key'
         * FIXME: When 'commit' on ngrx debugging tool, we will get logged out
         * FIXME: as 'auth' state is cleared by it!!
         * FIXME: We can have a workaround by set initialState from localStorage.
         */
        this.subAuth = this.store.select<AuthState>('auth').subscribe(auth => {
            console.log("APP INIT: authState is: ", auth);
            this.auth = auth;
            if (auth.token) {
                console.error("***Cache Auth token***");
                AuthCache.cacheToken(auth.token);
                AuthCache.cacheJwt(auth.jwt);
                AuthCache.cacheDomainKey(auth.key);

                // Preload and cache all cms attributes, we must pass auth in
                // as sessionStorage may not be written when we kick the network
                // access
                this.store.dispatch(CmsAttrActions.loadAll(auth));
                if (auth.key === 'huluwa_uk') {
                    console.log("LOAD ShopAttr from huluwa_uk");
                    this.store.dispatch(ShopAttrActions.loadAll(auth));
                }
            } else {
                AuthCache.clean();
            }
        });
        
        this.subPref = this.store.select<Preference>('pref').subscribe(pref => {
            this.pref = pref;
            PrefCache.setPerPage(this.pref.listItemCount.toString());
        });
    }

    ngOnDestroy() {
        this.subAuth.unsubscribe();
        this.subPref.unsubscribe();
    }

    get isLoggedIn() { return this.store.let<boolean>(isDashboardUser()); }

    logout() {
        this.store.dispatch(AuthActions.logout());
        // FIXME: Should we have something send back from sideeffect??
        this.router.navigate(['/login']);
    }

    /* Login user into selected domain */
    loginDomain($event) {
        // Switch current domain key
        this.store.dispatch(AuthActions.switchDomain($event));
        // Get user profile from given domain
        this.store.dispatch(AuthActions.loginDomain(this.auth));
    }

    toggleSidebar($event) {
        this.store.dispatch(PreferenceActions.toggleSidebar());
    }
}
