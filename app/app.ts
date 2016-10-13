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

import { isDashboardUser, getCurDomainKey, getAuthToken, getDomainLatencies,
    getDomains, getDomainKeys, getAuthJwt, hasAuthFail }   from './reducers';

@Component({
    selector: 'admin-spa',
    template: require('./app.html')
})
export class App implements OnInit, OnDestroy
{
    subPing: any;
    subFail: any;
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
    isDashboardUser$: Observable<boolean>;
    
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
        
        this.listenOnDashboardUser();
        this.redirectLoginDomain();
        this.dispatchPing();
    }

    ngOnDestroy() {
        this.subDU.unsubscribe();
        this.subFail.unsubscribe();
        this.subPing.unsubscribe();
    }

    // Switch state between login and logout state
    listenOnDashboardUser() {
        this.subDU = this.isDashboardUser$.subscribe(isDU => {
            if (isDU) {
                console.log("Dashboard user is true!");
                this.isLoggedIn = true;
                this.loginDomain();
            } else {
                console.log("Dashboard user is false!");
                this.isLoggedIn = false;
                this.router.navigate(['/login']);
            }
        });
    }

    // TODO: This should be removed later
    // Redirect user to a guide page if failed to login to app server.
    redirectLoginDomain() {
        this.subFail = this.fail$
            .subscribe(() => this.router.navigate(['/domains']));
    }

    // Ping app server in every 5 seconds
    dispatchPing() {
        this.subPing = Observable.interval(5000)
            .subscribe(() => {
                if (this.isLoggedIn)
                    this.store.dispatch(AuthActions.pingDomains());
            });
    }

    logout() {  this.store.dispatch(AuthActions.logout());  }

    loginDomain($event: string = undefined) {
        this.store.dispatch(ShopAttrActions.loadAll($event));
        this.store.dispatch(SysAttrActions.loadAll($event));
        this.store.dispatch(CmsAttrActions.loadAll($event));
        this.store.dispatch(AuthActions.loginDomain($event));
        this.router.navigate(['/']);
    }

    toggleSidebar($event) {
        this.store.dispatch(PreferenceActions.toggleSidebar());
    }
}
