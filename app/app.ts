/**
 * This is the entry point of admin.huluwa.uk
 */

import { Component }         from '@angular/core';
import { ViewContainerRef }  from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Router }            from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { BaseEffects }       from './effects/effect.base';
import { AppState }          from './reducers';
import { PreferenceState }   from './reducers/preference';
import { AuthActions }       from './actions';
import { PreferenceActions } from './actions';
import { Alert }             from './models';
import { Domain }            from './models';
import { User }              from './models';
import { JwtPayload }        from './models';
import { Ping }              from './ping';

import { isDashboardUser, getCurDomainKey, getAuthToken,
    getDomains, getDomainKeys, getAuthJwt, hasAuthFail }   from './reducers';

@Component({
    selector: 'admin-spa',
    template: require('./app.html')
})
export class App implements OnInit, OnDestroy
{
    subFail: any;
    subDU: any;
    
    // Current active domain key.
    curDomainKey: string;

    /* TODO: This array will grow large, need to clean it periodically */
    alerts$: Observable<Alert[]>;

    curDomainKey$: Observable<string>;
    domainKeys$:   Observable<string[]>;
    domains$:      Observable<any>;
    jwt$:          Observable<JwtPayload>;
    pref$:         Observable<PreferenceState>;
    fail$:         Observable<boolean>;
    isDashboardUser$: Observable<boolean>;
    
    constructor(private viewContainerRef: ViewContainerRef,
                private store: Store<AppState>,
                private router: Router,
                private ping: Ping) { }

    ngOnInit() {
        // Initialize current domain key
        this.curDomainKey = BaseEffects.getDefaultKey();

        this.alerts$       = this.store.select<Alert[]>('alerts');
        this.curDomainKey$ = this.store.let(getCurDomainKey());
        this.domainKeys$   = this.store.let(getDomainKeys());
        this.domains$      = this.store.let(getDomains());
        this.jwt$          = this.store.let(getAuthJwt());
        this.pref$         = this.store.select<PreferenceState>('pref');
        this.fail$         = this.store.let(hasAuthFail());
        this.isDashboardUser$ = this.store.let(isDashboardUser());
        
        this.dispatchLoginDomain();
        this.redirectLoginDomain();
    }

    ngOnDestroy() {
        this.subDU.unsubscribe();
        this.subFail.unsubscribe();
    }

    // Kick a first time login to application server
    dispatchLoginDomain() {
        this.subDU = this.isDashboardUser$.filter(x => x === true).take(1)
            .subscribe(() => this.store
                .dispatch(AuthActions.loginDomain(this.curDomainKey)));
    }

    // Redirect user to a guide page if failed to login to app server.
    redirectLoginDomain() {
        this.subFail = this.fail$
            .subscribe(() => this.router.navigate(['/domains']));
    }

    logout() {
        this.store.dispatch(AuthActions.logout());
        this.router.navigate(['/login']);
    }

    loginDomain($event) {
        this.curDomainKey = $event;
        this.store.dispatch(AuthActions.loginDomain($event));
        this.router.navigate(['/']);
    }

    toggleSidebar($event) {
        this.store.dispatch(PreferenceActions.toggleSidebar());
    }
}
