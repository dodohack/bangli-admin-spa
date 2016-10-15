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
import { CmsAttrActions }    from './actions';
import { ShopAttrActions }   from './actions';
import { SysAttrActions }    from './actions';
import { AuthActions }       from './actions';
import { PreferenceActions } from './actions';
import { Alert }             from './models';
import { Domain }            from './models';
import { User }              from './models';
import { JwtPayload }        from './models';

import { isDashboardUser, hasAuthorRole, getCurDomainKey, getAuthToken,
    getDomainLatencies, getDomains, getDomainKeys,
    getAuthJwt, hasAuthFail }   from './reducers';

@Component({
    selector: 'admin-spa',
    template: require('./app.html')
})
export class App implements OnInit, OnDestroy
{
    subPing: any;
    subKey: any;
    subDU: any;

    isLoggedIn: boolean;

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

    constructor(private viewContainerRef: ViewContainerRef,
                private store: Store<AppState>,
                private router: Router) { }

    ngOnInit() {
        this.alerts$       = this.store.select<Alert[]>('alerts');
        this.curDomainKey$ = this.store.let(getCurDomainKey());
        this.domainKeys$   = this.store.let(getDomainKeys());
        this.domains$      = this.store.let(getDomains());
        this.jwt$          = this.store.let(getAuthJwt());
        this.pref$         = this.store.select<PreferenceState>('pref');
        this.fail$         = this.store.let(hasAuthFail());
        this.latencies$    = this.store.let(getDomainLatencies());
        this.isDashboardUser$ = this.store.let(isDashboardUser());
        
        this.listenOnBasicPermission();
        this.loadDomainData();
        this.dispatchPing();
    }

    ngOnDestroy() {
        this.subDU.unsubscribe();
        this.subKey.unsubscribe();
        this.subPing.unsubscribe();
    }

    // Switch state between login and logout state
    listenOnBasicPermission() {
        this.subDU = this.isDashboardUser$.subscribe(isDU => {
            if (isDU) {
                console.log("Dashboard user is true!");
                this.isLoggedIn = true;
                this.loginDomain();
            } else {
                console.log("Dashboard user is false!");
                this.isLoggedIn = false;
                this.logout();
            }
        });
    }

    // Load domain data when loginDomain success
    loadDomainData() {
        this.subKey = this.curDomainKey$.filter(key => key != undefined)
            .subscribe(key => {
                this.store.dispatch(ShopAttrActions.loadAll(key));
                this.store.dispatch(SysAttrActions.loadAll(key));
                this.store.dispatch(CmsAttrActions.loadAll(key));
            });
    }

    // Ping app server in every 5 seconds
    dispatchPing() {
        this.subPing = Observable.interval(5000)
            .subscribe(() => {
                if (this.isLoggedIn)
                    this.store.dispatch(AuthActions.pingDomains());
            });
    }

    logout() {
        // Kick a logout action to clean app state and cache
        this.store.dispatch(AuthActions.logout());
        this.router.navigate(['/login']);
    }

    loginDomain($event: string = undefined) {
        // We have to put the redirection before switching domain to avoid
        // error in some pages when cleaning up states.
        this.router.navigate(['/']);
        this.store.dispatch(AuthActions.loginDomain($event));
    }

    toggleSidebar($event) {
        this.store.dispatch(PreferenceActions.toggleSidebar());
    }
}
