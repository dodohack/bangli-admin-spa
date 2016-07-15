/**
 * Get user/users from API server
 */

import { Injectable }               from '@angular/core';
import { Jsonp, URLSearchParams }   from '@angular/http';

import { AuthService } from './auth.service';

import { APP } from '../app.api';

@Injectable()
export class UserService {

    params: URLSearchParams;

    constructor(private jsonp: Jsonp,
                private authService: AuthService) {

        /* Set up common JSONP request arguments */
        this.params = new URLSearchParams;
        this.params.set('callback', 'JSONP_CALLBACK');
        /*
         * FIXME: We should have a commonlized position to always set this
         * parameter: token.
         */
        if (this.authService.isLoggedIn())
            this.params.append('token', this.authService.getJwt());
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

    public getUsers(role, page, count) {

        if (count)
            this.params.append('count', count);

        /* FIXME: This is not working as we can't see any header is with the request */
        //let headers = new Headers({'Authorization': 'Bearer ' + localStorage.getItem('jwt')});

        /* Setup endpoint /admin/users/{role}/{page} and send request to it */
        let endpoint = APP.users + '/' + role + '/' + page;
        return this.jsonp
            .get(endpoint, {search: this.params})
            .map(res => res.json());
    }
}
