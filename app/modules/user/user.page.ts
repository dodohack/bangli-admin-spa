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
import { JwtPayload }        from '../../models/auth';

import { isMyProfile, getCurUser, hasSuperUserRole,
    getUserRoles }  from '../../reducers';

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
    subQParams: any;

    user$:        Observable<User>;
    roles$:       Observable<UserRole[]>;
    isSuperUser$: Observable<boolean>;
    isMyProfile$: Observable<boolean>;
    pref$:        Observable<PreferenceState>;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {
    }

    ngOnInit() {
        this.user$        = this.store.let(getCurUser());
        this.roles$       = this.store.let(getUserRoles());
        this.isSuperUser$ = this.store.let(hasSuperUserRole());
        this.isMyProfile$ = this.store.let(isMyProfile());
        this.pref$        = this.store.select<PreferenceState>(s => s.pref);

        // Domain switch parameter is passed in from this
        this.subQParams = this.route.queryParams.subscribe(params => {
            if (params['domain']) this.domain = params['domain'];
        });

        this.dispatchLoadUser();
    }

    ngOnDestroy() {
        this.subQParams.unsubscribe();
        this.subParams.unsubscribe();
    }

    /**
     * Dispatch an action to load user when URL changes
     */
    dispatchLoadUser() {
        this.subParams = this.route.params
            .subscribe(params => {
                if (params['id']) {
                    this.store.dispatch(UserActions.loadUser(params['id']));
                    // TODO: Domain is loaded seperately after user is load
                    // TODO: as we requires 'uuid' to load user domains. and
                    // TODO: majority of users doesn't have domains.

                    //this.store.dispatch(UserActions.loadUserDomains(params['id']));
                }
            });
    }

    savePreference($event) {
        this.store.dispatch(PreferenceActions.save($event));
    }

    saveDomains($event) {
        this.store.dispatch(UserActions.saveUserDomains($event));
    }

    /* TODO: Change from child view template need to be propergated up */
    saveProfile() {
        //this.store.dispatch(UserActions.saveUser());
    }

    /* Save user password to bangli-auth */
    saveCrefidential() {
        // TODO: Should we use the same method as saveProfile()?
        //this.store.dispatch(UserActions.saveUser());
    }
}
