/**
 * Get post/posts from API server
 */

import { Injectable }               from '@angular/core';
import { Jsonp, URLSearchParams }   from '@angular/http';

import { AuthService } from './auth.service';

import { APP } from '../app.api';
import {Observable} from "rxjs/Rx";

@Injectable()
export class PostService
{
    /* Number of posts per page */
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
        this.perPage = localStorage.getItem('postsPerPage');
        if (!this.perPage)
            this.setPostsPerPage(30);
    }

    /**
     * Set number of posts displayed per page
     */
    public setPostsPerPage(count)
    {
        /* Count must be between [1, 200] */
        this.perPage = count < 1 ? 1 : (count > 200 ? 200 : count);
        localStorage.setItem('postsPerPage', this.perPage);
    }

    /**
     * Retrieve posts list page menu
     */
    public getPostsMenu() {
        return this.jsonp
            .get(APP.menu_posts, {search: this.params})
            .map(res => res.json());
    }

    public getPosts(filter, condition, cur_page) {
        this.params.set('per_page', this.perPage);

        /* FIXME: This is not working as we can't see any header is with the request */
        //let headers = new Headers({'Authorization': 'Bearer ' + localStorage.getItem('jwt')});

        /* Setup endpoint and send request to it */
        let endpoint = APP.posts + '/' + filter + '/' + condition + '/' + cur_page;
        return this.jsonp
            .get(endpoint, {search: this.params})
            .map(res => res.json());
    }

    /**
     * Return the detail of given post id
     * @param id
     */
    public getPost(id) {
        let endpoint = APP.post + '/' + id;
        return this.jsonp
            .get(endpoint, {search: this.params})
            .map(res => res.json());
    }

    /**
     * Return all cms categories
     */
    public getCategories() {
        return this.jsonp
            .get(APP.cms_cats, {search: this.params})
            .map(res => res.json());
    }
}
