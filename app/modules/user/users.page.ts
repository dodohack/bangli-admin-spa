/**
 * Display list of users
 */

import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subscription }      from "rxjs/Rx";
import { Store }             from '@ngrx/store';

import { ENTITY }             from '../../models';
import { UserActions }        from '../../actions';
import { AppState, getUsers } from '../../reducers';
import { UsersState }         from '../../reducers/users';
import { User, UserParams }   from '../../models';

import { zh_CN }    from '../../localization';


@Component({ template: require('./users.page.html') })
export class UsersPage implements OnInit, OnDestroy
{
    // Observable subscribers
    subUsers: any;
    subParams: any;

    usersState: UsersState;
    
    routeRoleId: string;

    // URL parameters for list of users
    params: any;

    // Is search is running
    loading: boolean;
    
    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {}

    ngOnInit() {
        this.dispatchLoadUsers();
        this.loadUsers();
    }

    ngOnDestroy() {
        this.subUsers.unsubscribe();
        this.subParams.unsubscribe();
    }

    /**
     * Dispatch an action to load list of users when URL changes
     */
    dispatchLoadUsers() {
        this.subParams = Observable
            .merge(this.route.params, this.route.queryParams)
            .filter((p, i) => Object.keys(p).length !== 0)
            .subscribe(params => {
                // Compare if elements of url params change
                if (JSON.stringify(this.params) !== JSON.stringify(params)) {
                    this.loading = true;

                    this.params.cur_page = params['page'];
                    this.params.datetype = params['datetype'];
                    this.params.datefrom = params['datefrom'];
                    this.params.dateto   = params['dateto'];
                    this.params.query    = params['query'];

                    this.store.dispatch(UserActions.loadUsers(this.params));
                }
            });
    }

    /**
     * Read users back from ngrx store
     */
    loadUsers() {
        this.subUsers = this.store.select<UsersState>('users')
            .subscribe(usersState => {
                // Set search loading to false if users is loaded
                this.loading = false;
                this.usersState = usersState;
            });
    }

    get zh() { return zh_CN.user; }
    get userRoles() { return ''; /*this.userService.roles; */}
    get etype() { return ENTITY.USER; }

}
