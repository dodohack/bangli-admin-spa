/**
 * Post[s] side effects
 */
import { Injectable }                     from '@angular/core';
import { Http, Headers, RequestOptions }  from '@angular/http';
import { Effect, Actions }                from '@ngrx/effects';
import { Observable }                     from 'rxjs/Observable';

import { AuthCache }       from '../auth.cache';
import { PrefCache }       from '../pref.cache';
import { PostActions }  from '../actions';
import { Post }         from "../models";

@Injectable()
export class PostEffects {

    headers: Headers;

    constructor (private actions$: Actions,
                 private http: Http) {
        this.headers = new Headers({
            'Authorization': 'Bearer' + AuthCache.token(),
            'Content-Type': 'application/json'});
    }

    @Effect() loadPosts$ = this.actions$.ofType(PostActions.LOAD_POSTS)
        .switchMap(action => this.getPosts(action.payload))
        .map(posts => PostActions.loadPostsSuccess(posts))
        .catch(() => Observable.of(PostActions.loadPostsFail()));

    @Effect() loadPost$ = this.actions$.ofType(PostActions.LOAD_POST)
        .switchMap(action => this.getPost(action.payload))
        .map(post => PostActions.loadPostSuccess(post))
        .catch(() => Observable.of(PostActions.loadPostFail()));

    @Effect() putPost$ = this.actions$.ofType(PostActions.SAVE_POST)
        .map(action => action.payload)
        .switchMap(post => this.putPost(post))
        .map(res => PostActions.savePostSuccess())
        .catch(() => Observable.of(PostActions.savePostFail()));

    //////////////////////////////////////////////////////////////////////////
    // Private helper functions

    /**
     * Get a post
     */
    private getPost(id: string): Observable<Post> {
        let api = AuthCache.API().cms_posts +
            '/' + id + '?token=' + AuthCache.token();
        return this.http.get(api).map(res => res.json());
    }

    /**
     * Update a post
     */
    private putPost(post: Post): Observable<Post> {
        console.log("SAVING POST: ", post);
        // FIXME: If return true immediately, status SAVE_POST_SUCCESS happens
        // FIXME: before SAVE_POST, why???
        //return Observable.of(true);

        let body = JSON.stringify(post);
        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API().cms_posts + '/' + post.id;
        return this.http.post(api, body, options).map(res => res.json());
    }

    /**
     * Create a new post
     */
    private postPost(post: Post): Observable<Post> {
        let body = JSON.stringify(post);
        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API().cms_posts;
        return this.http.post(api, body, options).map(res => res.json());
    }

    /**
     * Delete a post
     */
    private deletePost(post: Post): Observable<Post> {
        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API().cms_posts + '/' + post.id;
        return this.http.delete(api, options).map(res => res.json());
    }

    /**
     * Get posts
     */
    private getPosts(filters: any): Observable<any> {
        let cur_page = filters.cur_page;
        //let status   = filters.status;
        let api = AuthCache.API().posts + '/' + cur_page +
            '?per_page=' + PrefCache.getPerPage() +
            //'&status=' + status +
            '&token=' + AuthCache.token();
        return this.http.get(api).map(res => res.json());
    }

    /**
     * Update posts
     */
    private putPosts(posts: Post[]): Observable<Post[]> {
        let body = JSON.stringify(posts);

        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API().cms_posts_batch;
        return this.http.put(api, body, options).map(res => res.json());
    }

    /**
     * Delete posts
     */
    private deletePosts(posts: Post[]): Observable<Post[]> {
        let body = JSON.stringify(posts);

        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API().cms_posts_batch;
        // TODO: http.delete can't have a body
        //return this.http.delete(api, options).map(res => res.json());
    }

}