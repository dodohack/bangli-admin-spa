/**
 * Get user/users from API server
 */

import { Injectable }               from '@angular/core';
import { Jsonp, URLSearchParams }   from '@angular/http';

import { AuthService } from './auth.service';

import { APP } from '../app.api';

@Injectable()
export class UserService
{
    /* Number of users per page */
    perPage: any;
    params: URLSearchParams;

    /**
     * Initialize common code in constructor, as we can't have ngOnInit
     * in injectable service.
     * @param jsonp
     * @param authService
     */
    constructor(private jsonp: Jsonp, private authService: AuthService)
    {
        /* Set up common JSONP request arguments */
        this.params = new URLSearchParams;
        this.params.set('callback', 'JSONP_CALLBACK');
        this.params.set('token', this.authService.getJwt());

        /* Init number of users showing per list if there is none */
        this.perPage = localStorage.getItem('usersPerPage');
        if (!this.perPage)
            this.setUsersPerPage(30);
    }

    /**
     * Set number of users displayed per page
     */
    public setUsersPerPage(count)
    {
        /* Count must be between [1, 200] */
        this.perPage = count < 1 ? 1 : (count > 200 ? 200 : count);
        localStorage.setItem('usersPerPage', this.perPage);
    }

    /**
     * Get number of users displayed per page
     */
    public getUsersPerPage()
    {
        return this.perPage;
    }
    
    /**
     * Retrive user roles and number of users for each role.
     */
    public getRoles() {
        /* FIXME: This is not working as we can't see any header is with the request */
        //let headers = new Headers({'Authorization': 'Bearer ' + localStorage.getItem('jwt')});

        return this.jsonp
            .get(APP.user_menu, {search: this.params})
            .map(res => res.json());
    }

    public getUsers(role, page) {
        this.params.set('per_page', this.perPage);

        /* FIXME: This is not working as we can't see any header is with the request */
        //let headers = new Headers({'Authorization': 'Bearer ' + localStorage.getItem('jwt')});

        /* Setup endpoint /admin/users/{role}/{page} and send request to it */
        let endpoint = APP.users + '/' + role + '/' + page;
        return this.jsonp
            .get(endpoint, {search: this.params})
            .map(res => res.json());
    }
}
