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
import { AlertActions }      from '../../actions';
import { UserActions }       from '../../actions';
import { PreferenceActions } from '../../actions';
import { AuthState }         from '../../reducers/auth';
import { UsersState }        from '../../reducers/users';
import { PreferenceState }   from '../../reducers/preference';
import { User, UserRole }    from '../../models';
import { AuthUser }          from '../../models';
import { Domain }            from '../../models';
import { JwtPayload }        from '../../models/auth';

import { isMyProfile, getCurUser, hasSuperUserRole, getAuthUser,
    getUserRoles, getDomainKeys, getAvailableDomains }  from '../../reducers';

@Component({ template: require('./user.page.html') })
export class UserPage implements OnInit, OnDestroy
{
    user: User;

    // The domain we are going to switch to if it is given
    domain: string;

    subUser: any;
    subAuth: any;
    subPref: any;
    subParams: any;

    user$:        Observable<User>;
    authUser$:    Observable<AuthUser>;
    isSuperUser$: Observable<boolean>;
    isMyProfile$: Observable<boolean>;
    pref$:        Observable<PreferenceState>;
    roles$:       Observable<UserRole[]>;
    domainKeys$:  Observable<string[]>;
    domains$:     Observable<Domain[]>;
    
    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {
    }

    ngOnInit() {
        this.user$        = this.store.let(getCurUser());
        this.isSuperUser$ = this.store.let(hasSuperUserRole());
        this.isMyProfile$ = this.store.let(isMyProfile());
        this.pref$        = this.store.select<PreferenceState>(s => s.pref);
        this.roles$       = this.store.let(getUserRoles());
        this.domainKeys$  = this.store.let(getDomainKeys());

        this.authUser$    = this.store.let(getAuthUser());
        this.domains$     = this.store.let(getAvailableDomains());

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
                    this.store.dispatch(UserActions.loadUser(params['uuid']));
                    this.store.dispatch(UserActions.loadAuthUser(params['uuid']));
                }
            });
    }

    savePreference($event) {
        this.store.dispatch(PreferenceActions.save($event));
    }

    saveAuthUser($event) {
        this.store.dispatch(UserActions.saveAuthUser($event));
    }

    /* TODO: Change from child view template need to be propergated up */
    saveProfile() {
        //this.store.dispatch(UserActions.saveUser());
    }
}
