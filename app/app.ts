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
import { AuthActions }       from './actions';
import { PreferenceActions } from './actions';
import { Alert }             from './models';
import { Domain }            from './models';
import { JwtPayload }        from './models';
import { Ping }              from './ping';

import { isDashboardUser, getCurDomainKey,
    getDomains, getDomainKeys, getAuthJwt }   from './reducers';

@Component({
    selector: 'admin-spa',
    template: require('./app.html')
})
export class App implements OnInit, OnDestroy
{
    /* TODO: This array will grow large, need to clean it periodically */
    alerts$: Observable<Alert[]>;

    curDomainKey$: Observable<string>;
    domainKeys$:   Observable<string[]>;
    domains$:      Observable<any>;
    jwt$:          Observable<JwtPayload>;
    pref$:         Observable<PreferenceState>;
    isDashboardUser$: Observable<boolean>;

    constructor(private viewContainerRef: ViewContainerRef,
                private store: Store<AppState>,
                private router: Router,
                private ping: Ping) { }

    ngOnInit() {
        this.alerts$       = this.store.select<Alert[]>('alerts');
        this.curDomainKey$ = this.store.let(getCurDomainKey());
        this.domainKeys$   = this.store.let(getDomainKeys());
        this.domains$      = this.store.let(getDomains());
        this.jwt$          = this.store.let(getAuthJwt());
        this.pref$         = this.store.select<PreferenceState>('pref');
        this.isDashboardUser$ = this.store.let(isDashboardUser());
    }

    ngOnDestroy() {
    }

    logout() {
        this.store.dispatch(AuthActions.logout());
        this.router.navigate(['/login']);
    }

    loginDomain($event) {
        this.store.dispatch(AuthActions.loginDomain($event));
    }

    toggleSidebar($event) {
        this.store.dispatch(PreferenceActions.toggleSidebar());
    }
}
