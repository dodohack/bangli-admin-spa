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

        let mergedParams = Observable.merge(this.route.params, this.route.queryParams);

        mergedParams.subscribe(params => this.loadPosts(params));

        // Must have parameters defined in routes: :page, :state
        this.route.params.subscribe(params => {
            let cur_page   = params['page'] || '1';
            let state      = params['state'] || 'all';
            this.store.dispatch(PostActions.loadPosts({cur_page: cur_page,
                state: state}));
        });

        //
        // FIXME: We need to dispatch single 'loadPosts' action whether
        // route.params or route.queryParams changes, NEED merge 2 observables!
        //

        // Optional query parameters: author, editor, category, from, to, query
        this.route.queryParams.subscribe(params => {
            let author = params['author'] || '';     // filter by author id
            let editor = params['editor'] || '';     // filter by editor id
            let category = params['category'] || ''; // filter by category
            let from_date = params['from'] || '';    // filter: start date
            let to_date = params['to'] || '';        // filter: end date
            let query = params['query'] || '';       // search query string
        });

        // Load the post list
        this.store.select<PostsState>('posts')
            .subscribe(postsState => this.postsState = postsState);
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

        let postParams: PostParams = PostParams(cur_page, state,
        author, editor, category, datefrom, dateto, query);

        // Load list of posts from API server
        this.store.dispatch(PostActions.loadPosts(postParams));
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