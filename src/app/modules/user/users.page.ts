/**
 * Display list of users
 */

import { Component }         from '@angular/core';
import { HostListener }      from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Store }             from '@ngrx/store';

import { ENTITY }             from '../../models';
import * as UserActions       from '../../actions/user';
import { AppState }           from '../../reducers';
import { UsersState }         from '../../reducers/users';
import { User, UserParams }   from '../../models';

import { zh_CN }    from '../../localization';

import { getUsers, getIsUserLoading, getUserPaginator } from '../../reducers';

@Component({ templateUrl: './users.page.html' })
export class UsersPage implements OnInit, OnDestroy
{
    // Observable subscribers
    subParams: any;
    subLoad: any;

    // URL parameters
    params: any;
    
    // Is pageless loading
    pageless: boolean = false;
    isLoading: boolean;

    isLoading$:  Observable<boolean>;
    users$:      Observable<User[]>;
    paginator$:  Observable<any>;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>,
                private router: Router) {}

    ngOnInit() {
        this.isLoading$  = this.store.select(getIsUserLoading);
        this.users$      = this.store.select(getUsers);
        this.paginator$  = this.store.select(getUserPaginator);

        this.subLoad = this.isLoading$.subscribe(x => this.isLoading = x);
        
        this.dispatchLoadUsers();
    }

    ngOnDestroy() {
        this.subParams.unsubscribe();
        this.subLoad.unsubscribe();
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
                    this.params = Object.assign({}, params);

                    this.params.cur_page = params['page'];
                    this.params.datetype = params['datetype'];
                    this.params.datefrom = params['datefrom'];
                    this.params.dateto   = params['dateto'];
                    this.params.query    = params['query'];

                    if (this.pageless)
                        this.store.dispatch(new UserActions.LoadUsersOnScroll(this.params));
                    else
                        this.store.dispatch(new UserActions.LoadUsers(this.params));
                }
            });
    }

    /**
     * Pageless loading
     * Load next page of users when scroll to page bottom
     */
    @HostListener('window:scroll')
    loadUsersOnScroll() {
        if (this.pageless && !this.isLoading &&
            (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            setTimeout(() => {
                if (this.isLoading) return;
                if (this.params['role'])
                    this.router.navigate(['/user', 
                        'page', +this.params['page'] + 1, 'role', this.params['role']]);
                else
                    this.router.navigate(['/user',
                        'page', +this.params['page'] + 1]);
            }, 10);
        }
    }

    get zh() { return zh_CN.user; }
    get etype() { return ENTITY.USER; }

    // FIXME
    get userRoles() { return ''; }
}
