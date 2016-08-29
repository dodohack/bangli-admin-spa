/**
 * This is the post list management page component
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { AppState }          from '../../reducers';
import { PostsState }        from '../../reducers/posts';
import { AuthState }         from '../../reducers/auth';
import { CmsAttrsState }     from '../../reducers/cmsattrs';
import { PostActions }       from '../../actions';

import { User, Post, Category, Tag, Topic,
         Paginator } from '../../models';

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

        this.route.params.subscribe(params => {
            let cur_page   = params['page'] ? params['page'] : '1';
            let state      = params['state'] ? params['state'] : 'all';
            this.store.dispatch(PostActions.loadPosts({cur_page: cur_page,
                state: state}));
        });

        // Load the post list
        this.store.select<PostsState>('posts')
            .subscribe(postsState => this.postsState = postsState);
    }

    canDeactivate() {
        return true;
    }

    /* Localization, have to wrapper it as template only access 
     * component local methods/properties */
    get zh() { return zh_CN.post; }
    //get authors() { return this.userService.authors; }
    //get editors() { return this.userService.editors; }

    //get statuses()   { return this.postService.statuses; }
    //get categories() { return this.postService.categories; }
    //get tags()       { return this.postService.tags; }
    //get topics()     { return this.postService.topics; }
}