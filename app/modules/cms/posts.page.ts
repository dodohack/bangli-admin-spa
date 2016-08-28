/**
 * This is the post list management page component
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { AppState }          from '../../reducers';
import { PostActions }       from '../../actions';

import { User, Post, Category, Tag, Topic,
         Paginator } from '../../models';

import { zh_CN } from '../../localization';

@Component({ template: require('./posts.page.html') })
export class PostsPage implements OnInit
{   
    /* Posts state in ngrx */
    postsState$: Observable<any>;

    tabs = {'cat': false, 'tag': false, 'topic': false};

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {
        this.postsState$ = this.store.select('posts');
    }

    
    ngOnInit() {
        /* TODO: Get status/author/editor from url as well */
        this.route.params.subscribe(params => {
           let cur_page = params['page'] ? params['page'] : '1';
            this.store.dispatch(PostActions.loadPosts({cur_page: cur_page}));
        });
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