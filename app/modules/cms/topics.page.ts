/**
 * This is the topic list management page component
 */

import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { Category, Tag, Paginator } from '../../models';
import { Post, Topic, TopicParams } from '../../models';

import { Ping }              from '../../ping';
import { AppState }          from '../../reducers';
import { AuthState }         from '../../reducers/auth';
import { CmsAttrsState }     from '../../reducers/cmsattrs';
import { TopicsState }       from '../../reducers/topics';
import { TopicActions }      from '../../actions';

import { zh_CN } from '../../localization';

@Component({ template: require('./topics.page.html') })
export class TopicsPage implements OnInit, OnDestroy
{
    // All subscribers, needs to unsubscribe on destroy
    subAuth: any;
    subCms: any;
    subTopics: any;
    subActivityOn: any;
    subActivityOff: any;
    subParams: any;
    subQueryParams: any;

    authState:   AuthState;
    cmsState:    CmsAttrsState;
    topicsState: TopicsState;

    // Batch editing topics
    topicsInEdit: Topic[];

    params: any;
    queryParams: any;

    // Is list is in loading state
    loading: boolean;

    constructor(private route:ActivatedRoute,
                private store: Store<AppState>,
                private ping: Ping) { }


    ngOnInit() {
        this.subAuth = this.store.select<AuthState>('auth')
            .subscribe(authState => this.authState = authState);
        /* TODO: Check if there are multiple network request between
         * posts/topics pages */
        this.subCms = this.store.select<CmsAttrsState>('cms')
            .subscribe(cmsState => this.cmsState = cmsState);
        this.subTopics = this.store.select<TopicsState>('topics')
            .subscribe(topicsState => {
                this.loading = false;
                this.topicsState = topicsState;
                // Create new copies of topics
                this.topicsInEdit = this.topicsState.editing
                    .map(id => Object.assign({}, this.topicsState.entities[id]));
            });

        // FIXME: See fixme in posts.page.ts
        this.subParams = this.route.params.subscribe(params => {
            this.params = params;
            this.loading = true;
            this.loadTopics();
        });
        this.subQueryParams = this.route.queryParams.subscribe(params => {
            this.queryParams = params;
            this.loading = true;
            this.loadTopics();
        })
    }

    ngOnDestroy() {
        this.subAuth.unsubscribe();
        this.subCms.unsubscribe();
        this.subTopics.unsubscribe();
        this.subParams.unsubscribe();
        this.subQueryParams.unsubscribe();
    }

    get zh() { return zh_CN.cms; };
    //get editors() { return this.userService.editors; };
    //get categories() { return this.postService.categories; };
    //get statuses() { return this.topicService.statuses; }
    
    loadTopics() {
        let topicParams: TopicParams = new TopicParams;

        // Must have parameters come from route.params observable
        if (this.params) {
            topicParams.cur_page = this.params['page'];
            topicParams.state    = this.params['state'];
        }

        // Optional parameters come from route.queryParams observable
        if (this.queryParams) {
            topicParams.editor   = this.queryParams['editor'];
            topicParams.category = this.queryParams['category'];
            topicParams.datetype = this.queryParams['datetype'];
            topicParams.datefrom = this.queryParams['datefrom'];
            topicParams.dateto   = this.queryParams['dateto'];
            topicParams.query    = this.queryParams['query'];
        }

        // Load list of posts from API server
        this.store.dispatch(TopicActions.loadTopics(topicParams));
    }

    // In page edit single or multiple topics
    batchEdit(ids: number[]) {
        this.store.dispatch(TopicActions.batchEditTopics(ids));
    }

    // FIXME: Should be Cancel batch options
    cancelBatchEdit() {
        this.store.dispatch(TopicActions.cancelBatchEditTopics());
    }

    // Edit previous post in current posts list
    editPreviousPost() {
        this.store.dispatch(TopicActions.batchEditPreviousTopic());
    }

    // Edit next post in current posts list
    editNextPost() {
        this.store.dispatch(TopicActions.batchEditNextTopic());
    }

    // Delete multiple topics
    batchDelete(ids: number[]) {
        this.store.dispatch(TopicActions.batchDeleteTopics(ids));
    }

    // Lock posts to offline edit
    batchOfflineEdit(ids: number[]) {
        this.store.dispatch(TopicActions.batchOfflineEditTopics(ids));
    }

    // Add lock to posts, so no one can edit the post
    batchLock(ids: number[]) {
        this.store.dispatch(TopicActions.batchLockTopics(ids));
    }


    get sharedCats() {
        if (!this.topicsInEdit.length) return;

        if (this.topicsInEdit.length === 1) {
            return this.topicsInEdit[0].categories;
        } else {
            console.error("TODO, sharedCats");
        }
    }

    /////////////////////////////////////////////////////////////////////////
    // NOTE: Following add/remove actions are the same as single topic
    // Category, tag, post add/remove events
    selectCat(cat: Category) {
        // Unselect a category if is is previously selected, vice versa
        if (cat.checked) this.removeCat(cat.id);
        else this.addCat(cat);
    }
    addCat(cat: Category) {
        this.store.dispatch(TopicActions.addCategory(cat));
    }
    addTag(tag: Tag) {
        this.store.dispatch(TopicActions.addTag(tag));
    }
    addPost(post: Post) {
        this.store.dispatch(TopicActions.addPost(post));
    }
    removeCat(id: number) {
        this.store.dispatch(TopicActions.removeCategory(id));
    }
    removeTag(id: number) {
        this.store.dispatch(TopicActions.removeTag(id));
    }
    removePost(id: number) {
        this.store.dispatch(TopicActions.removePost(id));
    }

    // TODO:
    canDeactivate() { 
        return true;
    }
}