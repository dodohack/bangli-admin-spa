/**
 * Show detailed information about a user, includes shop order history,
 * user profile, shop cart state, vouchers, etc.
 * Also used to set customized settings,
 * some are stored in local storage, some are stored in database.
 */

import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { AppState }          from '../../reducers';
import * as AlertActions     from '../../actions/alert';
import * as UserActions      from '../../actions/user';
import * as PreferenceActions from '../../actions/preference';
import { AuthState }         from '../../reducers/auth';
import { UsersState }        from '../../reducers/users';
import { PreferenceState }   from '../../reducers/preference';
import { User, UserRole }    from '../../models';
import { AuthUser }          from '../../models';
import { Domain }            from '../../models';
import { JwtPayload }        from '../../models/auth';

import { isMyProfile, getCurUser, hasAdminRole, hasSuperUserRole,
    getAuthUser, getUserRoles, getDomainKeys,
    getAvailableDomains }  from '../../reducers';

@Component({ templateUrl: './user.page.html' })
export class UserPage implements OnInit, OnDestroy
{
    subParams: any;

    user: User;

    // The domain we are going to switch to if it is given
    domain: string;

    user$:        Observable<User>;
    authUser$:    Observable<AuthUser>;
    isSuperUser$: Observable<boolean>;
    isAdminUser$: Observable<boolean>;
    isMyProfile$: Observable<boolean>;
    pref$:        Observable<PreferenceState>;
    roles$:       Observable<UserRole[]>;
    allDomains$:  Observable<Domain[]>; // All available domain
    
    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {
    }

    ngOnInit() {
        this.user$        = this.store.select(getCurUser);
        this.isAdminUser$ = this.store.select(hasAdminRole);
        this.isSuperUser$ = this.store.select(hasSuperUserRole);
        this.isMyProfile$ = this.store.select(isMyProfile);
        this.pref$        = this.store.select<PreferenceState>(s => s.pref);
        this.roles$       = this.store.select(getUserRoles);

        this.authUser$    = this.store.select(getAuthUser);
        this.allDomains$  = this.store.select(getAvailableDomains);

        this.dispatchLoadUser();
    }

    ngOnDestroy() {
        this.subParams.unsubscribe();
    }

    /**
     * Dispatch an action to load user when URL changes
     */
    dispatchLoadUser() {
        this.subParams = this.route.params
            .subscribe(params => {
                if (params['uuid']) {
                    this.store.dispatch(new UserActions.LoadUser(params['uuid']));
                    this.store.dispatch(new UserActions.LoadAuthUser(params['uuid']));
                }
            });
    }

    savePreference($event) {
        this.store.dispatch(new PreferenceActions.Save($event));
    }

    saveAuthUser($event) {
        this.store.dispatch(new UserActions.SaveAuthUser($event));
    }

    /**
     * Select of deselect a user domain
     */
    toggleDomain($event) {
        this.store.dispatch(new UserActions.ToggleDashboardPermission($event));
    }

    toggleSuperUser() {
        this.store.dispatch(new UserActions.ToggleSuperUser());
    }

    /**
     * Save user domain specific profile
     */
    saveProfile($event) {
        this.store.dispatch(new UserActions.SaveUser($event));
    }
}
