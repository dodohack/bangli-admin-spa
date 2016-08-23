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
import { AlertActions }      from '../actions';
import { UserActions }       from '../actions';
import { PreferenceActions } from '../actions';

import { User } from "../models";

@Component({
    template: require('./user.page.html')
})
export class UserPage implements OnInit
{
    /* The user we are viewing */
    user$:   Observable<User>;

    auth$:   Observable<any>;
    pref$:   Observable<any>;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {
        this.auth$   = this.store.select('auth');
        this.pref$   = this.store.select('pref');
    }

    ngOnInit() {
        this.user$ = this.route.params.select<string>('uuid')
            .switchMap(uuid => this.store.let(getUser(uuid)));
    }

    savePreference($event) {
        this.store.dispatch(PreferenceActions.save($event));
    }

    saveDomains($event) {
        this.store.dispatch(UserActions.saveDomains($event));
    }
    
    onSubmitProfile() 
    {
        /*
        this.userService.postUserProfile(this.user).subscribe(
                ret => {
                    if (ret['status'] == 0)
                        this.store.dispatch(AlertActions.success('保存成功'));
                    else
                        this.store.dispatch(AlertActions.error('保存失败' + ret['msg']));
                });
                */
    }

    /**
     * Event from child view
     * @param $event
     */
    displayAlerts($event)
    {
        /*
        if($event['status'] == 0)
            this.store.dispatch(AlertActions.success('保存成功'));
        else
            this.store.dispatch(AlertActions.error('保存失败' + $event['msg']));
            */
    }
    
    /* If the user current editing is myself or not */
    get isMyProfile() { return true; /*this.authService.uuid === this.uuid;*/ }
    
    /* Am I super user */
    get isSuperUser() { return true; /*this.authService.isSuperUser;*/ }
}
