/**
 * Post[s] side effects
 */
import { Injectable }                     from '@angular/core';
import { Http, Headers, RequestOptions }  from '@angular/http';
import { Effect, Actions }                from '@ngrx/effects';
import { Observable }                     from 'rxjs/Observable';

import { AuthCache }       from '../auth.cache';
import { PrefCache }       from '../pref.cache';
import { PostActions }     from '../actions';
import { AlertActions }    from '../actions';
import { PostParams }      from "../models";
import { Post }            from "../models";

@Injectable()
export class PostEffects {

    constructor (private actions$: Actions,
                 private http: Http) {}
    
    get headers() { 
        return new Headers({
            'Authorization': 'Bearer' + AuthCache.token(),
            'Content-Type': 'application/json'});
    }
    
    @Effect() loadPosts$ = this.actions$.ofType(PostActions.LOAD_POSTS)
        .switchMap(action => this.getPosts(action.payload)
            .map(posts => PostActions.loadPostsSuccess(posts))
            .catch(() => Observable.of(PostActions.loadPostsFail()))
        );

    @Effect() loadPost$ = this.actions$.ofType(PostActions.LOAD_POST)
        .switchMap(action => this.getPost(action.payload)
            .map(post => PostActions.loadPostSuccess(post))
            .catch(() => Observable.of(PostActions.loadPostFail()))
        );

    @Effect() putPost$ = this.actions$.ofType(PostActions.SAVE_POST)
        .switchMap(action => this.savePost(action.payload)
            .map(post => PostActions.savePostSuccess(post))
            .catch(() => Observable.of(PostActions.savePostFail()))
        );

    @Effect() savePostSuccess$ = this.actions$.ofType(PostActions.SAVE_POST_SUCCESS)
        .map(action => AlertActions.success('文章保存成功!'));
    
    @Effect() savePostFail$ = this.actions$.ofType(PostActions.SAVE_POST_FAIL)
        .map(action => AlertActions.error('文章保存失败!'));

    //////////////////////////////////////////////////////////////////////////
    // Private helper functions

    /**
     * Get a post
     */
    private getPost(id: string): Observable<Post> {
        let api = AuthCache.API() + AuthCache.API_PATH().cms_posts +
            '/' + id + '?token=' + AuthCache.token();
        return this.http.get(api).map(res => res.json());
    }

    /**
     * Create/Update a post
     */
    private savePost(post: Post): Observable<Post> {
        console.log("SAVING POST: ", post);

        let body = JSON.stringify(post);
        let options = new RequestOptions({ headers: this.headers });
        
        if (post.id && post.id !== 0) {
            // Update an existing post
            let api = AuthCache.API() + AuthCache.API_PATH().cms_posts + '/' + post.id;
            return this.http.put(api, body, options).map(res => res.json());            
        } else {
            // Create a new post
            let api = AuthCache.API() + AuthCache.API_PATH().cms_posts;
            return this.http.post(api, body, options).map(res => res.json());
        }
    }

    /**
     * Delete a post
     */
    private deletePost(post: Post): Observable<Post> {
        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API() + AuthCache.API_PATH().cms_posts + '/' + post.id;
        return this.http.delete(api, options).map(res => res.json());
    }

    /**
     * Get posts
     */
    private getPosts(params: PostParams): Observable<any> {
          let api = AuthCache.API() + AuthCache.API_PATH().cms_posts
              + params.toQueryString() 
              + '&per_page=' + PrefCache.getPerPage() 
              + '&token=' + AuthCache.token();

        console.log("LOAD POST FROM URL: ", api);

        return this.http.get(api).map(res => res.json());
    }

    /**
     * Update posts
     */
    private putPosts(posts: Post[]): Observable<Post[]> {
        let body = JSON.stringify(posts);

        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API() + AuthCache.API_PATH().cms_posts_batch;
        return this.http.put(api, body, options).map(res => res.json());
    }

    /**
     * Delete posts
     */
    private deletePosts(posts: Post[]): Observable<Post[]> {
        let body = JSON.stringify(posts);

        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API() + AuthCache.API_PATH().cms_posts_batch;
        // TODO: http.delete can't have a body
        console.error("Unimplemented: deletePosts");
        return this.http.delete(api, options).map(res => res.json());
    }

}