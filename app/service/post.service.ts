/**
 * Get post/posts from API server
 */

import { Injectable }                    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { PostStatus, Category, Post, Tag, Topic }  from '../models';
import { AuthService } from './auth.service';

import { Api } from '../api';
import { UserPreference } from '../preference';

@Injectable()
export class PostService
{
    /* API endpoint of current domain */
    API: any;

    /* Http request headers */
    headers: Headers;
    options: RequestOptions;

    /* Post status */
    statuses: PostStatus[];

    /* Available categories */
    categories: Category[];

    /* Available tags */
    tags: Tag[];

    /* Available topics to post */
    topics: Topic[];

    constructor(private http: Http,
                private authService: AuthService)
    {
        console.log("PostService initialized.");
        
        this.API = Api.getEndPoint();

        /* Set http authenticate header */
        this.headers =
            new Headers({'Authorization': 'Bearer ' + this.authService.getJwt()});
        this.options = new RequestOptions({ headers: this.headers });

        this.initStatuses();
        this.initCategories();
        this.initTags();
        this.initTopics();
    }

    public getPosts(filter, condition, cur_page) {
        /* http://api/admin/posts/{filter}/{cond}/{cur_page}?per_page=<number> */
        let endpoint = this.API.posts + '/' + filter + '/'
            + condition + '/' + cur_page + '?per_page=' + UserPreference.itemsPerList();

        return this.http.get(endpoint, this.options).map(res => res.json());
    }

    /**
     * Return the detail of given post id
     * @param id
     */
    public getPost(id) {
        return this.http.get(this.API.post + '/' + id, this.options)
                   .map(res => res.json());
    }

    /**
     * Save post to database
     */
    public savePost(post: Post) {
        let endpoint = this.API.post + '/' + post.id;

        this.headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: this.headers });
        let body    = JSON.stringify(post);

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
     * Retrieve statuses of posts from API server
     */
    private initStatuses() {
        this.http.get(this.API.post_statuses, this.options)
            .map(res => res.json())
            .subscribe(statuses => this.statuses = statuses);
    }

    /**
     * Init all cms categories
     */
    private initCategories() {
        this.http.get(this.API.cms_cats, this.options)
            .map(res => res.json())
            .subscribe(cats => this.categories = cats);
    }

    /**
     * Init all cms tags
     */
    private initTags() {
        this.http.get(this.API.cms_tags, this.options)
            .map(res => res.json())
            .subscribe(tags => this.tags = tags);
    }

    /**
     * Init all cms topics available to post
     */
    private initTopics() {
        this.http.get(this.API.cms_topics, this.options)
            .map(res => res.json())
            .subscribe(topics => this.topics = topics);
    }
}
