/**
 * Display list of users
 */

import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';

import { UserService } from '../service/user.service';

@Component({
    templateUrl: 'app/pages/users.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [UserService]
})
export class UsersPage implements OnInit
{
    /* Total number of users of given group */
    total: any;
    /* Which group of users is currently showing */
    role: any;
    /* Current page index of user list */
    page: any;
    /* Count of users per page */
    count: any;
    /* The list of users, array */
    users: any;
    /* User roles and number of users each role */
    roles: any;

    constructor(private route: ActivatedRoute,
                private userService: UserService) {}

    /**
     * Initialize the page, we should only put DI initializition into ctor.
     * If no role/page is setting from URL segment, we will display the first
     * page of all customers by default.
     */
    ngOnInit()
    {
        this.role = 'customer';
        this.page = '1';
        this.count = this.userService.getUsersPerPage();

        this.getRolesMenu();

        /* Get URL segments and update user list */
        this.route.params.subscribe(
            segment => {
                this.role = segment['role'] ? segment['role'] : 'customer';
                /* (+) converts string 'id' to a number */
                this.page = segment['page'] ? +segment['page'] : 1;
                /* Update user list when URL changes */
                this.getUsersList();
            }
        );
    }

    /**
     * Get user roles and number of users per role
     */
    private getRolesMenu()
    {
        this.userService.getRoles().subscribe(
            json  => this.roles = json,
            error => console.error(error)
        );
    }

    /**
     * Get a list of users
     */
    private getUsersList()
    {
        this.userService.getUsers(this.role, this.page)
            .subscribe(
                json => {
                    this.total = json['total'];
                    //this.count = json['per_page'];
                    this.users = json['data'];
                },
                error => console.error(error)
            );
    }

    /**
     * Set number of users displayed per list
     */
    public setUsersPerPage()
    {
        this.userService.setUsersPerPage(this.count);
        this.getUsersList();
    }
}
