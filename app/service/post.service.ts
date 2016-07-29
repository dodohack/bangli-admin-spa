/**
 * Get post/posts from API server
 */

import { Injectable }               from '@angular/core';
import { Jsonp, Http, Headers, RequestOptions, URLSearchParams }   from '@angular/http';
import { Observable } from "rxjs/Observable";

import { PostStatus, Category, Post, Tag, Topic }  from '../models';
import { AuthService } from './auth.service';
import { APP } from '../app.api';

@Injectable()
export class PostService
{
    /* Number of posts per page */
    perPage: any;
    params: URLSearchParams;

    /* Post status */
    statuses: Observable<PostStatus[]>;

    /* Available categories */
    categories: Observable<Category[]>;

    /* Available tags */
    tags: Observable<Tag[]>;

    /* Available topics to post */
    topics: Observable<Topic[]>;

    /**
     * Initialize common code in constructor, as we can't have ngOnInit
     * in injectable service.
     * @param jsonp
     * @param authService
     */
    constructor(private jsonp: Jsonp, private http: Http,
                private authService: AuthService)
    {
        /* Set up common JSONP request arguments */
        this.params = new URLSearchParams;
        this.params.set('callback', 'JSONP_CALLBACK');
        this.params.set('token', this.authService.getJwt());

        /* Init number of users showing per list if there is none */
        this.perPage = localStorage.getItem('postsPerPage');
        if (!this.perPage)
            this.setPostsPerPage(30);
        
        this.initStatuses();
        this.initCategories();
        this.initTags();
        this.initTopics();
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
     * Retrieve statuses of posts from API server
     */
    private initStatuses() {
        this.statuses = this.jsonp
            .get(APP.post_statuses, {search: this.params})
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
     * Save post to database
     * TODO: Filter out non-dirty columns
     */
    public savePost(post: Post) {
        let endpoint = APP.post + '/' + post.id;
        let body = JSON.stringify(post);

        console.log("SAVING POST: ", body);

        let headers = new Headers({ 'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')});
        let options = new RequestOptions({ headers: headers });

        return this.http.post(endpoint, body, options);
            //.map(res => res.json() || {});
    }

    /**
     * Save post to localStorage
     * @param post
     */
    public autoSave(post: Post) {
        localStorage.setItem('post', JSON.stringify(post));
    }

    public loadAutoSave(): Post {
        let post = localStorage.getItem('post');
        if (post) {
            return JSON.parse(post);
        }
    }

    /**
     * Return all cms categories
     */
    private initCategories() {
        this.categories = this.jsonp
            .get(APP.cms_cats, {search: this.params})
            .map(res => res.json());
    }

    /**
     * Return all cms tags
     */
    private initTags() {
        this.tags = this.jsonp
            .get(APP.cms_tags, {search: this.params})
            .map(res => res.json());
    }

    /**
     * Return all cms topics available to post
     */
    private initTopics() {
        this.topics = this.jsonp
            .get(APP.cms_topics, {search: this.params})
            .map(res => res.json());
    }
}
