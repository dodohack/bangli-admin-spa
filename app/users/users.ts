/**
 * Display list of users
 */

import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';

import { Pagination }  from '../datatype/pagination';
import { UserService } from '../service/user.service';

@Component({
    templateUrl: 'app/users/users.html',
    directives: [ROUTER_DIRECTIVES]
})
export class UsersPage implements OnInit
{
    /* Pagination related variables of the list */
    pagination = new Pagination(0, 1, 0, 0, 0, 0, 0, 0, 0);

    /* Which group of users is currently showing */
    current_role: any;
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
        this.current_role = 'customer';
        this.pagination.current_page = 1;
        this.pagination.per_page = this.userService.getUsersPerPage();

        this.getRolesMenu();

        /* Get URL segments and update user list */
        this.route.params.subscribe(
            segment => {
                this.current_role = segment['role'] ? segment['role'] : 'customer';
                /* '+' magically converts string to number */
                this.pagination.current_page = segment['page'] ? +segment['page'] : 1;
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
        this.userService.roles.subscribe(
            json  => this.roles = json,
            error => console.error(error)
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
                    /* '+' magically converts string to number */
                    this.pagination.total = +json['total'];
                    this.pagination.per_page = +json['per_page'];
                    this.pagination.current_page = +json['current_page'];
                    this.pagination.last_page = +json['last_page'];
                    this.pagination.from = +json['from'];
                    this.pagination.to = +json['to'];
                    this.users = json['data'];

                    this.pagination.pre_page =
                        this.pagination.current_page > 1 ?
                        this.pagination.current_page - 1 : this.pagination.current_page;
                    this.pagination.next_page =
                        this.pagination.current_page < this.pagination.last_page ?
                        this.pagination.current_page + 1 : this.pagination.last_page;
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
