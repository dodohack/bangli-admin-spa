/**
 * Get user/users from API server
 */

import { Injectable }                    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { User }           from '../models/user';
import { AuthService }    from './auth.service';

@Injectable()
export class UserService
{
    /* Http request headers */
    headers: Headers;
    options: RequestOptions;

    /* Authors list */
    authors: User[];

    /* Editors list */
    editors: User[];

    /* List of user roles(used in user list page) */
    roles: string[];

    constructor(private http: Http,
                private authService: AuthService)
    {
        console.log("UserService initialized.");

        /* Set http authenticate header */
        this.headers =
            new Headers({'Authorization': 'Bearer ' + this.authService.jwt});
        this.options = new RequestOptions({ headers: this.headers });

        this.initAuthorEditors();
        this.initRoles();
    }

    /**
     * Retrieve a list of users of given role and current page of the list
     */
    public getUsers(cur_role, cur_page)
    {
        /* http://api/admin/users/{role}/{cur_page}?=per_page=<number> */
        let endpoint = this.authService.API.users + '/' + cur_role + '/' + cur_page
            + '?per_page=' + 20;

        return this.http.get(endpoint, this.options)
                   .map(res => res.json());
    }

    /**
     * Retrieve user base profile by uuid
     * @param uuid
     */
    public getUserBaseProfile(uuid)
    {
        let endpoint = this.authService.API.user_base_profile + '/' + uuid;
        return this.http.get(endpoint, this.options).map(res => res.json());
    }
    public getUserProfile(uuid)
    {
        let endpoint = this.authService.API.user_profile + '/' + uuid;
        return this.http.get(endpoint, this.options).map(res => res.json());
    }

    public postUserBaseProfile(user: User)
    {
        return this.post(this.authService.API.user_base_profile, user);
    }
    public postUserProfile(user: User)
    {
        return this.post(this.authService.API.user_profile, user);
    }

    
    ///////////////////////////////////////////////////////////////////////////
    // Private helper functions

    private post(endpoint: string, user: User)
    {
        let body = JSON.stringify(user);
        return this.http.post(endpoint, body, this.options).map(res => res.json());
    }

    /**
     * Retrive user roles and number of users for each role.
     */
    private initRoles()
    {
        this.http.get(this.authService.API.user_roles, this.options)
                 .map(res => res.json())
                 .subscribe(json => this.roles = json);
    }

    /**
     * Return all users who can at least edit their posts, so we will use
     * this data in many locations such as post list, post editing page, etc.
     * users includes: author, editor, shop_manager, admin, etc
     */
    private initAuthorEditors()
    {
        this.http.get(this.authService.API.authors, this.options)
            .map(res => res.json())
            .subscribe( authors => {
                this.authors = authors;
                this.editors = authors.filter(p => p.role != 'author');
            });
    }
}
