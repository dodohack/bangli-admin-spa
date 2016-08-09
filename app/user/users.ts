/**
 * Display list of users
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

import { User, Pagination }  from '../models';
import { UserService } from '../service';
import { PaginatorComponent, ListPageHeaderComponent } from "../components";
import { zh_CN }    from '../localization';

let t = require('./users.html');
@Component({
    template: t,
    directives: [ PaginatorComponent, ListPageHeaderComponent ]
})
export class UsersPage implements OnInit
{
    base = 'user/list';
    baseUrl: string;

    /* Which group of users is currently showing */
    current_role: any;

    /* The list of users, array */
    users: User[];

    pagination = new Pagination;

    constructor(private route: ActivatedRoute,
                private userService: UserService) {}

    ngOnInit() { this.initUserList(); }

    get zh() { return zh_CN.user; }
    get userRoles() { return this.userService.roles; }
    
    private initUserList()
    {
        /* Get URL segments and update user list */
        this.route.params.subscribe(
            segment => {
                this.current_role = segment['role'] ? segment['role'] : 'any';
                this.baseUrl = this.base + '/' + this.current_role;
                /* '+' magically converts string to number */
                this.pagination.current_page = segment['page'] ? +segment['page'] : 1;
                /* Update user list when URL changes */
                this.getUsersList();
            }
        );        
    }

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
}
