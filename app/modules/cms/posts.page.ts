/**
 * This is the post list management page component
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { Post, PostParams }  from '../../models';
import { Category, Tag, Topic} from '../../models';
import { Activity }          from '../../models';
import { AppState }          from '../../reducers';
import { PostsState }        from '../../reducers/posts';
import { AuthState }         from '../../reducers/auth';
import { CmsAttrsState }     from '../../reducers/cmsattrs';
import { PostActions }       from '../../actions';
import { Ping }              from '../../ping';

import { zh_CN } from '../../localization';

@Component({ template: require('./posts.page.html') })
export class PostsPage implements OnInit
{   
    authState:  AuthState;
    cmsState:   CmsAttrsState;
    postsState: PostsState;
    
    // Batch editing posts
    postsInEdit: Post[];

    params: any;
    queryParams: any;

    // Is search is running
    loading: boolean;

    _activity: {[key: string]: Activity[]};

    get zh() { return zh_CN.post; }
    
    constructor(private route: ActivatedRoute,
                private store: Store<AppState>,
                private ping: Ping) {}

    ngOnInit() {
        this.store.select<AuthState>('auth')
            .subscribe(authState => this.authState = authState);
        this.store.select<CmsAttrsState>('cms')
            .subscribe(cmsState => this.cmsState = cmsState);
        this.store.select<PostsState>('posts')
            .subscribe(postsState => {
                // Set search loading to false if posts is loaded
                this.loading = false;
                this.postsState = postsState;
                // Create new copies of posts
                this.postsInEdit = this.postsState.editing
                    .map(id => Object.assign({}, this.postsState.entities[id]));
            });

        this.ping.activity$.subscribe(activity => {
            this._activity = activity;
            if (this._activity.hasOwnProperty('cms_post'))
                this.store.dispatch(PostActions.refreshActivityStatus(this._activity['cms_post']));
        })

        // THIS IS A TEMPORARY FIX
        // FIXME: Previous request is cancel by the second one if exists
        // FIXME: and potential other kind of issues
        // Load posts when any url parameter changes
        this.route.params.subscribe(params => {
            this.params = params;
            this.loading = true;
            this.loadPosts();
        });
        this.route.queryParams.subscribe(params => {
            this.queryParams = params;
            this.loading = true;
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
            postParams.datetype = this.queryParams['datetype'];
            postParams.datefrom = this.queryParams['datefrom'];
            postParams.dateto   = this.queryParams['dateto'];
            postParams.query    = this.queryParams['query'];
        }

        // Load list of posts from API server
        this.store.dispatch(PostActions.loadPosts(postParams));
    }
    
    // In page edit single or multiple posts
    batchEdit(ids: number[]) {
        this.store.dispatch(PostActions.batchEditPosts(ids));
    }
    cancelBatchEdit() {
        this.store.dispatch(PostActions.cancelBatchEditPosts());
    }
    editPreviousPost() {
        this.store.dispatch(PostActions.batchEditPreviousPost());
    }
    editNextPost() {
        this.store.dispatch(PostActions.batchEditNextPost());
    }
    // Delete multiple posts
    batchDelete(ids: number[]) {
        console.error("TODO: GOING TO DISPATCH ACTION TO DELETE POST: ", ids);
        //this.store.dispatch(PostActions.batchEditPosts(ids));
    }
    
    // Get shared tags for posts in editing mode
    get sharedTags() {
        if (!this.postsInEdit.length) return;

        if (this.postsInEdit.length === 1) {
            return this.postsInEdit[0].tags;
        } else {
            console.error("TODO, sharedTags");
        }
    }

    get sharedCats() {
        if (!this.postsInEdit.length) return;

        if (this.postsInEdit.length === 1) {
            return this.postsInEdit[0].categories;
        } else {
            console.error("TODO, sharedCats");
        }
    }

    get sharedTopics() {
        if (!this.postsInEdit.length) return;

        if (this.postsInEdit.length === 1) {
            return this.postsInEdit[0].topics;
        } else {
            console.error("TODO, sharedTopics");
        }
    }

    /////////////////////////////////////////////////////////////////////////
    // NOTE: Following add/remove actions are the same as single post
    // Category, tag, topic add/remove events
    selectCat(cat: Category) {
        // Unselect a category if is is previously selected, vice versa
        if (cat.checked) this.removeCat(cat.id);
        else this.addCat(cat);
    }
    addCat(cat: Category) {
        this.store.dispatch(PostActions.addCategory(cat));
    }
    addTag(tag: Tag) {
        this.store.dispatch(PostActions.addTag(tag));
    }
    addTopic(topic: Topic) {
        this.store.dispatch(PostActions.addTopic(topic));
    }
    removeCat(id: number) {
        this.store.dispatch(PostActions.removeCategory(id));
    }
    removeTag(id: number) {
        this.store.dispatch(PostActions.removeTag(id));
    }
    removeTopic(id: number) {
        this.store.dispatch(PostActions.removeTopic(id));
    }

    canDeactivate() {
        return true;
    }
}