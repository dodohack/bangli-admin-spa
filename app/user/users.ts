/**
 * Display list of users
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

import { User, Pagination }  from '../models';
import { UserService } from '../service';
import { PaginatorComponent } from "../components";
import { zh_CN }    from '../localization';

let template = require('./users.html');
@Component({
    template: template,
    directives: [ PaginatorComponent ]
})
export class UsersPage implements OnInit
{
    /* Pagination related variables of the list */
    pagination = new Pagination(0, 1, 0, 0, 0, 0, 0, 0, 0);

    base = 'user/list';
    baseUrl: string;

    /* Which group of users is currently showing */
    current_role: any;

    /* The list of users, array */
    users: User[];

    constructor(private route: ActivatedRoute,
                private userService: UserService){}

    /**
     * Initialize the page, we should only put DI initializition into ctor.
     * If no role/page is setting from URL segment, we will display the first
     * page of all customers by default.
     */
    ngOnInit()
    {
        this.current_role = 'customer';
        this.pagination.current_page = 1;
        this.pagination.per_page = this.userService.getUsersPerPage();

        /* Get URL segments and update user list */
        this.route.params.subscribe(
            segment => {
                this.current_role = segment['role'] ? segment['role'] : 'customer';
                this.baseUrl = this.base + '/' + this.current_role;
                /* '+' magically converts string to number */
                this.pagination.current_page = segment['page'] ? +segment['page'] : 1;
                /* Update user list when URL changes */
                this.getUsersList();
            }
        );
    }

    get zh() { return zh_CN.user; }
    get userRoles() { return this.userService.roles; }

    /**
     * Get a list of users
     */
    private getUsersList()
    {
        this.userService.getUsers(this.current_role, this.pagination.current_page)
            .subscribe(
                json => {
                    this.users = json['data'];
                    this.pagination.setup(json);
                },
                error => console.error(error)
            );
    }

    /**
     * Set number of users displayed per list
     */
    public setUsersPerPage()
    {
        this.userService.setUsersPerPage(this.pagination.per_page);
        this.getUsersList();
    }
}
