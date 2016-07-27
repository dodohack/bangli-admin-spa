/**
 * Get user/users from API server
 */

import { Injectable }               from '@angular/core';
import { Jsonp, URLSearchParams }   from '@angular/http';
import { Observable }               from 'rxjs/Observable';

import { User }        from '../models/user';
import { AuthService } from './auth.service';
import { APP } from '../app.api';

@Injectable()
export class UserService
{
    /* Number of users per page */
    perPage: any;
    params: URLSearchParams;

    /* Authors and Editors */
    authors: Observable<User[]>;
    //editors: Observable<User[]>;
    /* List of user roles */
    roles: Observable<string[]>;

    /**
     * Initialize common code in constructor, as we can't have ngOnInit
     * in injectable service.
     * @param jsonp
     * @param authService
     */
    constructor(private jsonp: Jsonp, private authService: AuthService)
    {
        console.log("UserService initialized.");
        /* Set up common JSONP request arguments */
        this.params = new URLSearchParams;
        this.params.set('callback', 'JSONP_CALLBACK');
        this.params.set('token', this.authService.getJwt());

        /* Init number of users showing per list if there is none */
        this.perPage = localStorage.getItem('usersPerPage');
        if (!this.perPage)
            this.setUsersPerPage(30);

        /* Initial observables */
        this.initAuthors();
        //this.initEditors();
        this.getRoles();
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
    private getRoles()
    {
        /* FIXME: This is not working as we can't see any header is with the request */
        //let headers = new Headers({'Authorization': 'Bearer ' + localStorage.getItem('jwt')});

        this.roles = this.jsonp
            .get(APP.menu_users, {search: this.params})
            .map(res => res.json());
    }

    /**
     * Retrieve a list of users of given role and current page of the list
     */
    public getUsers(cur_role, cur_page)
    {
        this.params.set('per_page', this.perPage);

        /* FIXME: This is not working as we can't see any header is with the request */
        //let headers = new Headers({'Authorization': 'Bearer ' + localStorage.getItem('jwt')});

        /* Setup endpoint /admin/users/{role}/{page} and send request to it */
        let endpoint = APP.users + '/' + cur_role + '/' + cur_page;
        return this.jsonp
            .get(endpoint, {search: this.params})
            .map(res => res.json());
    }

    /**
     * Return all users who can at least edit their posts, so we will use
     * this data in many locations such as post list, post editing page, etc.
     * users includes: author, editor, shop_manager, admin, etc
     */    
    private initAuthors()
    {
        this.authors = this.jsonp
            .get(APP.authors, {search: this.params})
            .map(res => res.json());
    }

    /*
    private initEditors()
    {
        this.editors = this.jsonp
            .get(APP.editors, {search: this.params})
            .map(res => res.json());
    }
    */
}
