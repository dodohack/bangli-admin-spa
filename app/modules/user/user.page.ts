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

import { AppState, getUser } from '../../reducers';
import { hasSuperUserRole }  from '../../reducers';
import { AlertActions }      from '../../actions';
import { UserActions }       from '../../actions';
import { PreferenceActions } from '../../actions';
import { AuthState }         from '../../reducers/auth';
import { UsersState }        from '../../reducers/users';
import { PreferenceState }   from '../../reducers/preference';
import { User }              from '../../models';
import { JwtPayload }        from '../../models/auth';


@Component({ template: require('./user.page.html') })
export class UserPage implements OnInit, OnDestroy
{
    // Current user uuid
    uuid: string;

    // UsersState, AuthState and PreferenceState
    usersState: UsersState;
    authState: AuthState;
    prefState: PreferenceState;

    // The domain we are going to switch to if it is given
    domain: string;

    subUser: any;
    subAuth: any;
    subPref: any;
    subParams: any;
    subQParams: any;

    // If current user is a super user
    isSuperUser: boolean;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {
    }

    ngOnInit() {
        this.subAuth = this.store.select<AuthState>('auth').subscribe(state => {
            this.authState = state;
        }) ;
        this.subPref = this.store.select<PreferenceState>('pref')
            .subscribe(state => this.prefState = state);

        // Domain switch parameter is passed in from this
        this.subQParams = this.route.queryParams.subscribe(params => {
            if (params['domain']) this.domain = params['domain'];
        });

        this.dispatchLoadUser();
        this.loadUser();

        this.store.let(hasSuperUserRole()).subscribe(x => this.isSuperUser = x);
    }

    ngOnDestroy() {
        this.subQParams.unsubscribe();
        this.subParams.unsubscribe();
        this.subUser.unsubscribe();
        this.subAuth.unsubscribe();
        this.subPref.unsubscribe();
    }

    /**
     * Dispatch an action to load user when URL changes
     */
    dispatchLoadUser() {
        this.subParams = this.route.params.select<string>('uuid')
            .subscribe(params => {
                this.uuid = params['uuid'];
                this.store.dispatch(UserActions.loadUser(this.uuid));
                this.store.dispatch(UserActions.loadDomains(this.uuid));
            });
    }

    /**
     * Read user back from ngrx store
     */
    loadUser() {
        this.subUser = this.store.select<UsersState>('users')
            .subscribe(usersState => {
                this.usersState = usersState;
            });
    }

    get jwt() { return this.authState.jwt; }

    /**
     * If the user I'm viewing is my profile
     */
    get isMyProfile() { return this.jwt.sub === this.uuid; }

    get user() { return this.usersState.entities[this.uuid]; }

    savePreference($event) {
        this.store.dispatch(PreferenceActions.save($event));
    }

    saveDomains($event) {
        this.store.dispatch(UserActions.saveDomains($event));
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
