/**
 * This is the entry point of admin.huluwa.uk
 */

import { Component }         from '@angular/core';
import { ViewContainerRef }  from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Router }            from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { AppState }          from './reducers';
import { PreferenceState }   from './reducers/preference';
import * as CmsAttrActions   from './actions/cmsattr';
import * as SysAttrActions   from './actions/sysattr';
import * as AuthActions      from './actions/auth';
import * as PreferenceActions from './actions/preference';
import { Alert }             from './models';
import { Domain }            from './models';
import { User }              from './models';
import { JwtPayload }        from './models';

import { isDashboardUser, hasAuthorRole, getCurDomainKey, getAuthToken,
    getDomainLatencies, getDomains, getDomainKeys,
    hasCurProfile, getAuthJwt, getAuthFail, getAlert, getPreference
}   from './reducers';

@Component({
    selector: 'admin-spa',
    templateUrl: './app.html'
})
export class App implements OnInit, OnDestroy
{
    subPing: any;
    subKey: any;
    subDU: any;
    subIsLoggedInDomain: any;

    isPingEnabled = true;
    isLoggedIn    = false;

    /* TODO: This array will grow large, need to clean it periodically */
    alerts$: Observable<Alert[]>;

    curDomainKey$: Observable<string>;
    domainKeys$:   Observable<string[]>;
    domains$:      Observable<any>;
    jwt$:          Observable<JwtPayload>;
    pref$:         Observable<PreferenceState>;
    fail$:         Observable<boolean>;
    latencies$:    Observable<any>;
    isDashboardUser$: Observable<boolean>; // Per domain permission from auth server
    isLoggedInDomain$:Observable<boolean>; // Current domain user profile

    constructor(private viewContainerRef: ViewContainerRef,
                private store: Store<AppState>,
                private router: Router) { }

    ngOnInit() {
        this.alerts$       = this.store.select(getAlert);
        this.curDomainKey$ = this.store.select(getCurDomainKey);
        this.domainKeys$   = this.store.select(getDomainKeys);
        this.domains$      = this.store.select(getDomains);
        this.jwt$          = this.store.select(getAuthJwt);
        this.pref$         = this.store.select(getPreference);
        this.fail$         = this.store.select(getAuthFail);
        this.latencies$    = this.store.select(getDomainLatencies);
        this.isDashboardUser$  = this.store.select(isDashboardUser);
        this.isLoggedInDomain$ = this.store.select(hasCurProfile);
        
        this.listenOnBasicPermission();
        this.loadDomainData();
        this.dispatchPing();
    }

    ngOnDestroy() {
        this.subDU.unsubscribe();
        this.subKey.unsubscribe();
        this.subIsLoggedInDomain.unsubscribe();
        this.subPing.unsubscribe();
    }

    // Switch state between login and logout state
    listenOnBasicPermission() {
        this.subDU = this.isDashboardUser$.subscribe(isDU => {
            if (isDU) {
                console.log("Dashboard user is true!");
                this.isLoggedIn = true;
            } else {
                console.log("Dashboard user is false!");
                this.isLoggedIn = false;
                this.logout();
            }
        });

        // FIXME: We have fixed the domain key here!!
        // Load domain user profile if we haven't load it
        this.subIsLoggedInDomain = this.isLoggedInDomain$
            .take(1).filter(b => !b)
            .subscribe(x => this.store.dispatch(new AuthActions.LoginDomain('bangli_uk')));
    }

    // Load domain data when loginDomain success
    loadDomainData() {
        this.subKey = this.curDomainKey$.filter(key => key != undefined && key != '')
            .subscribe(key => {
                this.store.dispatch(new SysAttrActions.LoadAll(key));
                this.store.dispatch(new CmsAttrActions.LoadAll(key));
            });
    }

    // Ping app server in every 5 seconds
    dispatchPing() {
        this.subPing = Observable.interval(5000)
            .subscribe(() => {
                if (this.isLoggedIn && this.isPingEnabled)
                    this.store.dispatch(new AuthActions.PingDomains());
            });
    }

    logout() {
        // Kick a logout action to clean app state and cache
        this.store.dispatch(new AuthActions.Logout());
        this.router.navigate(['/login']);
    }

    loginDomain($event: string = undefined) {
        // We have to put the redirection before switching domain to avoid
        // error in some pages when cleaning up states.
        this.router.navigate(['/']);
        this.store.dispatch(new AuthActions.LoginDomain($event));
    }

    toggleSidebar($event) {
        this.store.dispatch(new PreferenceActions.ToggleSidebar());
    }
}
