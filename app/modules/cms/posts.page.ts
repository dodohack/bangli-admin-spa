/**
 * This is the post list management page component
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { PostParams }        from '../../models';
import { AppState }          from '../../reducers';
import { PostsState }        from '../../reducers/posts';
import { AuthState }         from '../../reducers/auth';
import { CmsAttrsState }     from '../../reducers/cmsattrs';
import { PostActions }       from '../../actions';

import { zh_CN } from '../../localization';

@Component({ template: require('./posts.page.html') })
export class PostsPage implements OnInit
{   
    /* Posts states*/
    authState:  AuthState;
    cmsState:   CmsAttrsState;
    postsState: PostsState;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {}


    
    ngOnInit() {
        this.store.select<AuthState>('auth')
            .subscribe(authState => this.authState = authState);
        this.store.select<CmsAttrsState>('cms')
            .subscribe(cmsState => this.cmsState = cmsState);
        this.store.select<PostsState>('posts')
            .subscribe(postsState => this.postsState = postsState);

        // Load posts when any url parameter changes
        let mergedParams = Observable.merge(this.route.params, this.route.queryParams);
        mergedParams.subscribe(params => this.loadPosts(params));
    }

    canDeactivate() {
        return true;
    }

    loadPosts(params: any) {
        // Must have parameters come from route.params observable
        let cur_page   = params['page'] || '1';
        let state      = params['state'] || 'all';

        // Optional parameters come from route.queryParams observable
        let author = params['author'] || '';     // filter by author id
        let editor = params['editor'] || '';     // filter by editor id
        let category = params['category'] || ''; // filter by category
        let datefrom = params['datefrom'] || ''; // filter: start date
        let dateto = params['dateto'] || '';     // filter: end date
        let query = params['query'] || '';       // search query string

        let postParams: PostParams = new PostParams(cur_page, state,
        author, editor, category, datefrom, dateto, query);

        // Load list of posts from API server
        this.store.dispatch(PostActions.loadPosts(postParams));
    }

    get zh() { return zh_CN.post; }
    //get authors() { return this.userService.authors; }
    //get editors() { return this.userService.editors; }

    //get statuses()   { return this.postService.statuses; }
    //get categories() { return this.postService.categories; }
    //get tags()       { return this.postService.tags; }
    //get topics()     { return this.postService.topics; }
}