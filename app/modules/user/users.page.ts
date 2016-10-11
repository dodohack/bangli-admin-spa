/**
 * Display list of users
 */

import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Store }             from '@ngrx/store';

import { ENTITY }             from '../../models';
import { UserActions }        from '../../actions';
import { AppState }           from '../../reducers';
import { UsersState }         from '../../reducers/users';
import { User, UserParams }   from '../../models';

import { zh_CN }    from '../../localization';

import { getUsers, getIsUserLoading, getUserPaginator } from '../../reducers';

@Component({ template: require('./users.page.html') })
export class UsersPage implements OnInit, OnDestroy
{
    // Observable subscribers
    subUsers: any;
    subParams: any;

    // URL parameters
    params: any;

    isLoading$:  Observable<boolean>;
    users$:      Observable<User[]>;
    paginator$:  Observable<any>;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {}

    ngOnInit() {
        this.isLoading$  = this.store.let(getIsUserLoading());
        this.users$      = this.store.let(getUsers());
        this.paginator$  = this.store.let(getUserPaginator());

        this.dispatchLoadUsers();
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
                    this.params = params;

                    this.params.cur_page = params['page'];
                    this.params.datetype = params['datetype'];
                    this.params.datefrom = params['datefrom'];
                    this.params.dateto   = params['dateto'];
                    this.params.query    = params['query'];

                    this.store.dispatch(UserActions.loadUsers(this.params));
                }
            });
    }

    get zh() { return zh_CN.user; }
    get etype() { return ENTITY.USER; }

    // FIXME
    get userRoles() { return ''; }
}
