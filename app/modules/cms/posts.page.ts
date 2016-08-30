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
    authState:  AuthState;
    cmsState:   CmsAttrsState;
    postsState: PostsState;

    params: any;
    queryParams: any;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {}

    ngOnInit() {
        this.store.select<AuthState>('auth')
            .subscribe(authState => this.authState = authState);
        this.store.select<CmsAttrsState>('cms')
            .subscribe(cmsState => this.cmsState = cmsState);
        this.store.select<PostsState>('posts')
            .subscribe(postsState => this.postsState = postsState);

        // THIS IS A TEMPORARY FIX
        // FIXME: Previous request is cancel by the second one if exists
        // FIXME: and potential other kind of issues
        // Load posts when any url parameter changes
        this.route.params.subscribe(params => {
            this.params = params;
            this.loadPosts();
        });
        this.route.queryParams.subscribe(params => {
            this.queryParams = params;
            this.loadPosts();
        });
    }

    loadPosts() {
        let postParams: PostParams = new PostParams;

        // Must have parameters come from route.params observable
        if (this.params) {
            postParams.cur_page = this.params['page'];
            postParams.state    = this.params['state'];
        }

        // Optional parameters come from route.queryParams observable
        if (this.queryParams) {
            postParams.author   = this.queryParams['author'];
            postParams.editor   = this.queryParams['editor'];
            postParams.category = this.queryParams['category'];
            postParams.datefrom = this.queryParams['datefrom'];
            postParams.dateto   = this.queryParams['dateto'];
            postParams.query    = this.queryParams['query'];
        }

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


    canDeactivate() {
        return true;
    }
}