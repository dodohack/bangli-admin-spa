/**
 * Display list of users
 */

import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subscription }      from "rxjs/Rx";
import { Store }             from '@ngrx/store';

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
    subQParams: any;

    usersState: UsersState;
    
    routeRoleId: string;

    params: any;
    queryParams: any;

    // Is search is running
    loading: boolean;
    
    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {}

    ngOnInit() {
        this.subUsers = this.store.select<UsersState>('users')
            .subscribe(usersState => {
                // Set search loading to false if users is loaded
                this.loading = false;
                this.usersState = usersState;
            });

        // THIS IS A TEMPORARY FIX
        // FIXME: Previous request is cancel by the second one if exists
        // FIXME: and potential other kind of issues
        // Load users when any url parameter changes
        this.subParams = this.route.params.subscribe(params => {
            this.params = params;
            this.loading = true;
            this.loadUsers();
        });
        this.subQParams = this.route.queryParams.subscribe(params => {
            this.queryParams = params;
            this.loading = true;
            this.loadUsers();
        });
    }

    /* TODO: Check if memory leaks if we don't do this */
    ngOnDestroy() {
        this.subUsers.unsubscribe();
        this.subParams.unsubscribe();
        this.subQParams.unsubscribe();
    }

    get zh() { return zh_CN.user; }
    get userRoles() { return ''; /*this.userService.roles; */}

    loadUsers() {
        let userParams: UserParams = new UserParams;
        
        // Must have parameters come from route.params observable
        if (this.params) {
            userParams.cur_page = this.params['page'];
        }

        // Optional parameters come from route.queryParams observable
        if (this.queryParams) {
            userParams.datetype = this.queryParams['datetype'];
            userParams.datefrom = this.queryParams['datefrom'];
            userParams.dateto   = this.queryParams['dateto'];
            userParams.query    = this.queryParams['query'];
        }

        // Load list of users from API server
        this.store.dispatch(UserActions.loadUsers(userParams));
    }
    
}
