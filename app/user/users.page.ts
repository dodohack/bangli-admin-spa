/**
 * Display list of users
 */

import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subscription }      from "rxjs/Rx";
import { Store }             from '@ngrx/store';

import { UserActions }        from '../actions';
import { AppState, getUsers } from '../reducers';
import { User, Paginator }    from '../models';
import { zh_CN }    from '../localization';


@Component({
    template: require('./users.page.html')
})
export class UsersPage implements OnInit, OnDestroy
{
    sub: Subscription;
    
    routeRoleId: string;

    usersState$: Observable<any>;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {
        this.usersState$ = this.store.select('users');
    }

    ngOnInit() {
        // FIXME: Avoid nested observable subscription, it cause problems, such
        // FIXME: as multiple subscription in inner subscibe.
        // TODO:
        // 1. UserActions.loadUsers() should be dispatched when url changes.
        // 2. this.users$ is assigned to the list of users
        // 3. support user role_id filters ('any' or role_id).
        // route.params.subscribe is not a good solution, we should use
        // route.params.switchMap() instead.
        this.sub = this.route.params.subscribe(params => {
            //let current_role = segment['role'] ? segment['role'] : 'any';
            /* FIXME: Paginator is always redirected to page/:page/0 !!! */
            let cur_page = params['page'] ? params['page'] : '1';
            this.routeRoleId = params['role'] ? params['role'] : '';
            this.store.dispatch(UserActions.loadUsers({cur_page: cur_page, role_id: this.routeRoleId}));
        });
    }

    /* TODO: Check if memory leaks if we don't do this */
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    get zh() { return zh_CN.user; }
    get userRoles() { return ''; /*this.userService.roles; */}
}
