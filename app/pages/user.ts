/**
 * Display list of users
 */

import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { UserService } from '../service/user.service';

@Component({
    templateUrl: 'app/pages/user.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [UserService]
})
export class UserPage
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

    constructor(private userService: UserService) {

        /* FIXME: We should get this from URLSegment and form model */
        this.role = 'customer';
        this.page = '1';
        this.count = '20';

        /* Retrive filter menu for user list */
        this.roles = this.userService.getRoles();
    }

    public getUsers()
    {
        this.userService.getUsers(this.role, this.page, this.count)
            .subscribe(
                json => {
                    this.total = json['total'];
                    this.count = json['per_page'];
                    this.users = json['data'];
                },
                error => console.error(error)
            );
    }
}
