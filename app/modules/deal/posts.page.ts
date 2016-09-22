/**
 * This is the deal post list management page component
 */

import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { Post, PostParams }  from '../../models';
import { Category, Tag, Topic} from '../../models';
import { Activity }          from '../../models';
import { AppState }          from '../../reducers';
import { PostsState }        from '../../reducers/deal.posts';
import { AuthState }         from '../../reducers/auth';
import { CmsAttrsState }     from '../../reducers/cmsattrs';
import { DealPostActions }   from '../../actions';
import { Ping }              from '../../ping';

import { zh_CN } from '../../localization';

@Component({ template: require('./posts.page.html') })
export class DealPostsPage implements OnInit, OnDestroy
{
    // All subscribers, needs to unsubscribe on destory
    subAuth: any;
    subCms: any;
    subPosts: any;
    subActivityOn: any;
    subActivityOff: any;
    subParams: any;
    subQueryParams: any;

    authState:  AuthState;
    cmsState:   CmsAttrsState;
    postsState: PostsState;

    // Batch editing posts
    postsInEdit: Post[];

    params: any;
    queryParams: any;

    // Is search is running
    loading: boolean;

    get zh() { return zh_CN.cms; }

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>,
                private ping: Ping) {}

    ngOnInit() {
        this.subAuth = this.store.select<AuthState>('auth')
            .subscribe(authState => this.authState = authState);
        this.subCms = this.store.select<CmsAttrsState>('cms')
            .subscribe(cmsState => this.cmsState = cmsState);
        this.subPosts = this.store.select<PostsState>('dealPosts')
            .subscribe(postsState => {
                // Set search loading to false if posts is loaded
                this.loading = false;
                this.postsState = postsState;
                // Create new copies of posts
                this.postsInEdit = this.postsState.editing
                    .map(id => Object.assign({}, this.postsState.entities[id]));
            });

        // THIS IS A TEMPORARY FIX
        // FIXME: Previous request is cancel by the second one if exists
        // FIXME: and potential other kind of issues
        // Load posts when any url parameter changes
        this.subParams = this.route.params.subscribe(params => {
            this.params = params;
            this.loading = true;
            this.loadPosts();
        });
        this.subQueryParams = this.route.queryParams.subscribe(params => {
            this.queryParams = params;
            this.loading = true;
            this.loadPosts();
        });
    }

    ngOnDestroy() {
        this.subAuth.unsubscribe();
        this.subCms.unsubscribe();
        this.subPosts.unsubscribe();
        this.subParams.unsubscribe();
        this.subQueryParams.unsubscribe();
    }

    loadPosts() {
        let postParams: PostParams = new PostParams;

        // Must have parameters come from route.params observable
        if (this.params) {
            postParams.channel  = this.params['channel'];
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
        this.store.dispatch(DealPostActions.loadPosts(postParams));
    }

    // In page edit single or multiple posts
    batchEdit(ids: number[]) {
        this.store.dispatch(DealPostActions.batchEditPosts(ids));
    }

    // FIXME: Should be Cancel batch options
    cancelBatchEdit() {
        this.store.dispatch(DealPostActions.cancelBatchEditPosts());
    }

    // Edit previous post in current posts list
    editPreviousPost() {
        this.store.dispatch(DealPostActions.batchEditPreviousPost());
    }

    // Edit next post in current posts list
    editNextPost() {
        this.store.dispatch(DealPostActions.batchEditNextPost());
    }

    // Delete multiple posts
    batchDelete(ids: number[]) {
        this.store.dispatch(DealPostActions.batchDeletePosts(ids));
    }

    // Lock posts to offline edit
    batchOfflineEdit(ids: number[]) {
        this.store.dispatch(DealPostActions.batchOfflineEditPosts(ids));
    }

    // Add lock to posts, so no one can edit the post
    batchLock(ids: number[]) {
        this.store.dispatch(DealPostActions.batchLockPosts(ids));
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
        this.store.dispatch(DealPostActions.addCategory(cat));
    }
    addTag(tag: Tag) {
        this.store.dispatch(DealPostActions.addTag(tag));
    }
    addTopic(topic: Topic) {
        this.store.dispatch(DealPostActions.addTopic(topic));
    }
    removeCat(id: number) {
        this.store.dispatch(DealPostActions.removeCategory(id));
    }
    removeTag(id: number) {
        this.store.dispatch(DealPostActions.removeTag(id));
    }
    removeTopic(id: number) {
        this.store.dispatch(DealPostActions.removeTopic(id));
    }

    // TODO:
    canDeactivate() {
        return true;
    }
}
