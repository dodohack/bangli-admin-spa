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

    constructor (private actions$: Actions,
                 private http: Http) {}

    @Effect() loadPosts$ = this.actions$.ofType(PostActions.LOAD_POSTS)
        .switchMap(action => this.getPosts(action.payload))
        .map(posts => PostActions.loadPostsSuccess(posts))
        .catch(() => Observable.of(PostActions.loadPostsFail()));

    @Effect() loadPost$ = this.actions$.ofType(PostActions.LOAD_POST)
        .switchMap(action => this.getPost(action.payload))
        .map(post => PostActions.loadPostSuccess(post))
        .catch(() => Observable.of(PostActions.loadPostFail()));
    
    @Effect() savePost$ = this.actions$.ofType(PostActions.SAVE_POST)
        .map(action => action.payload)
        .switchMap(post => this.savePost(post))
        .map(res => PostActions.savePostSuccess())
        .catch(() => Observable.of(PostActions.savePostFail()));

    //////////////////////////////////////////////////////////////////////////
    // Private helper functions

    /**
     * Save single post/multiple posts
     */
    private save(posts: Post[]): Observable<any> {
        let api = '';
        let body = JSON.stringify(posts);

        let headers = new Headers({
            'Authorization': AuthCache.token(),
            'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this.http.post(api, body, options).map(res => res.json());
    }

    private getPosts(filters: any): Observable<any> {
        let cur_page = filters.cur_page;
        //let status   = filters.status;
        let api = AuthCache.API().posts + '/' + cur_page +
            '?per_page=' + PrefCache.getPerPage() +
            //'&status=' + status +
            '&token=' + AuthCache.token();
        return this.http.get(api).map(res => res.json());
    }

    private getPost(id: string): Observable<Post> {
        let api = AuthCache.API().post + '/' + id + '?token=' + AuthCache.token();
        return this.http.get(api).map(res => res.json());
    }
    
    private savePost(post: Post): Observable<any> {
        console.log("SAVING POST: ", post);
        // FIXME: If return true immediately, status SAVE_POST_SUCCESS happens
        // FIXME: before SAVE_POST, why???
        //return Observable.of(true);

        let api = AuthCache.API().post + '/' + post.id;
        let body = JSON.stringify(post);

        let headers = new Headers({
            'Authorization': 'Bearer ' + AuthCache.token(),
            'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this.http.post(api, body, options).map(res => res.json());
    }
}