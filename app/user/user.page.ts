/**
 * Show detailed information about a user, includes shop order history,
 * user profile, shop cart state, vouchers, etc.
 * Also used to set customized settings,
 * some are stored in local storage, some are stored in database.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { AppState, getUser } from '../reducers';
import { hasSuperUserRole }  from '../reducers';
import { AlertActions }      from '../actions';
import { UserActions }       from '../actions';
import { PreferenceActions } from '../actions';

import { User } from "../models";

@Component({
    template: require('./user.page.html')
})
export class UserPage implements OnInit
{
    /* sub of jwt token and uuid of the user */
    sub$:    Observable<string>;
    uuid$:   Observable<string>;

    /* The list of users we are viewing */
    users$:   Observable<any>;
    auth$:   Observable<any>;
    pref$:   Observable<any>;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {
        this.users$  = this.store.select('users');
        this.auth$   = this.store.select('auth');
        this.pref$   = this.store.select('pref');
    }

    ngOnInit() {
        // FIXME: Do not use subscribe, use switchMap!!
        this.route.params.subscribe(params => {
            let uuid = params['uuid'];
            this.store.dispatch(UserActions.loadUser(uuid));
            this.store.dispatch(UserActions.loadDomains(uuid));
        });

        this.sub$ = this.auth$.map(user => user.payload.sub);
        this.uuid$ = this.route.params.select<string>('uuid');
    }

    /* TODO: We can always subscribe to get isMyProfile and isSuperUser from 
     * ngOnInit, do we still need to call async everywhere in template? */
    get isMyProfile(): Observable<boolean> {
        return this.sub$.combineLatest(this.uuid$).map(pair => pair[0] === pair[1]);
    }

    get isSuperUser(): Observable<boolean> {
        return this.store.let(hasSuperUserRole());
    }

    get user$(): Observable<any> {
        // Get user from users by uuid
        return this.uuid$.switchMap(uuid => this.store.let(getUser(uuid)));
    }

    savePreference($event) {
        this.store.dispatch(PreferenceActions.save($event));
    }

    saveDomains($event) {
        this.store.dispatch(UserActions.saveDomains($event));
    }

    /* TODO: Change from child view template need to be propergated up */
    saveProfile() {
        this.store.dispatch(UserActions.saveUser());
    }

    /* Save user password to bangli-auth */
    saveCrefidential() {
        // TODO: Should we use the same method as saveProfile()?
        this.store.dispatch(UserActions.saveUser());
    }
}
