/**
 * This base class for all entities page
 */

import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { Entity, EntityParams }  from '../../models';
import { Category, Tag, Topic} from '../../models';
import { Activity }          from '../../models';
import { AppState }          from '../../reducers';
import { EntitiesState }      from "../../reducers/entities";
import { EntitiesStateGroup } from "../../reducers/entities";
import { AuthState }         from '../../reducers/auth';
import { CmsAttrsState }     from '../../reducers/cmsattrs';
import { EntityActions }     from '../../actions';
import { Ping }              from '../../ping';

export class EntitiesPage implements OnInit, OnDestroy
{
    // All subscribers, needs to unsubscribe on destory
    subAuth: any;
    subCms: any;
    subEntities: any;
    subActivityOn: any;
    subActivityOff: any;
    subParams: any;
    subQueryParams: any;

    authState:  AuthState;
    cmsState:   CmsAttrsState;
    entitiesState: EntitiesState;
    entitiesStateGroup: EntitiesStateGroup;

    // Batch editing entities
    entitiesInEdit: Entity[];

    params: any;
    queryParams: any;

    // Is list entities are loading
    loading: boolean = true;
    // Is list entities loaded, we can't use !loading to check the loaded state
    // as the list is re-rendered at each time loading
    loaded: boolean = false;

    constructor(protected etype: string,
                protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected ping: Ping) {}

    ngOnInit() {
        this.subAuth = this.store.select<AuthState>('auth')
            .subscribe(authState => this.authState = authState);
        this.subCms = this.store.select<CmsAttrsState>('cms')
            .subscribe(cmsState => this.cmsState = cmsState);
        this.subEntities = this.store.select<EntitiesStateGroup>('entities')
            .subscribe(stateGroup => {
                if (stateGroup && stateGroup[this.etype]) {
                    console.log("ENTITIES ARE LOADED: ", stateGroup[this.etype]);
                    // Set search loading to false if posts is loaded
                    this.entitiesState = stateGroup[this.etype];
                    // Create new copies of entities
                    this.entitiesInEdit = this.entitiesState.editing
                        .map(id => Object.assign({}, this.entitiesState.entities[id]));
                    this.loading  = false;
                    this.loaded   = true;
                }
            });

        // Dispatch activity update action when we have the activities
        // changed(empty => sth, sth => sth; sth => empty)
        // FIXME: Need to check if ids in 'cms_post' activity is changed
        // FIXME: We are checking the who array listed in a['cms_post'] which
        // FIXME: is not a optimal method, we should check the id in array
        // FIXME: a['cms_posts'].
        /*
        this.subActivityOn = this.ping.activity$
            .filter(a => a['cms_post'])
            //.distinctUntilChanged(a => a['cms_post'])
            .subscribe(a =>
                this.store.dispatch(EntityActions.refreshActivityStatus(this.etype, a['cms_post'])));

        // Reset if we don't have any 'cms_post'
        this.subActivityOff = this.ping.activity$
            .filter(a => !a['cms_post'])
            .distinctUntilChanged(x => x)
            .subscribe(a =>
                this.store.dispatch(EntityActions.refreshActivityStatus(null)));
         */

        // THIS IS A TEMPORARY FIX
        // FIXME: Previous request is cancel by the second one if exists
        // FIXME: and potential other kind of issues
        // Load posts when any url parameter changes
        this.subParams = this.route.params.subscribe(params => {
            this.params = params;
            this.loading = true;
            this.loadEntities();
        });
        this.subQueryParams = this.route.queryParams.subscribe(params => {
            this.queryParams = params;
            this.loading = true;
            this.loadEntities();
        });
    }

    ngOnDestroy() {
        this.subAuth.unsubscribe();
        this.subCms.unsubscribe();
        this.subEntities.unsubscribe();
        //this.subActivityOn.unsubscribe();
        //this.subActivityOff.unsubscribe();
        this.subParams.unsubscribe();
        this.subQueryParams.unsubscribe();
    }

    loadEntities() {
        let entityParams: EntityParams = new EntityParams;

        // Must have parameters come from route.params observable
        if (this.params) {
            entityParams.channel  = this.params['channel'];
            entityParams.cur_page = this.params['page'];
            entityParams.state    = this.params['state'];
        }

        // Optional parameters come from route.queryParams observable
        if (this.queryParams) {
            entityParams.author   = this.queryParams['author'];
            entityParams.editor   = this.queryParams['editor'];
            entityParams.category = this.queryParams['category'];
            entityParams.datetype = this.queryParams['datetype'];
            entityParams.datefrom = this.queryParams['datefrom'];
            entityParams.dateto   = this.queryParams['dateto'];
            entityParams.query    = this.queryParams['query'];
        }

        // Load list of entities from API server
        this.store.dispatch(EntityActions.loadEntities(this.etype, entityParams));
    }

    // In page edit single or multiple entities
    batchEdit(ids: number[]) {
        this.store.dispatch(EntityActions.batchEditEntities(this.etype, ids));
    }

    // FIXME: Should be Cancel batch options
    cancelBatchEdit() {
        this.store.dispatch(EntityActions.cancelBatchEditEntities(this.etype));
    }

    // Edit previous post in current posts list
    editPreviousPost() {
        this.store.dispatch(EntityActions.batchEditPreviousEntity(this.etype));
    }

    // Edit next post in current posts list
    editNextPost() {
        this.store.dispatch(EntityActions.batchEditNextEntity(this.etype));
    }

    // Delete multiple posts
    batchDelete(ids: number[]) {
        this.store.dispatch(EntityActions.batchDeleteEntities(this.etype, ids));
    }

    // Lock posts to offline edit
    batchOfflineEdit(ids: number[]) {
        this.store.dispatch(EntityActions.batchOfflineEditEntities(this.etype, ids));
    }

    // Add lock to posts, so no one can edit the post
    batchLock(ids: number[]) {
        this.store.dispatch(EntityActions.batchLockEntities(this.etype, ids));
    }

    // Get shared tags for posts in editing mode
    get sharedTags() {
        if (!this.entitiesInEdit.length) return;

        if (this.entitiesInEdit.length === 1) {
            return this.entitiesInEdit[0].tags;
        } else {
            console.error("TODO, sharedTags");
        }
    }

    get sharedCats() {
        if (!this.entitiesInEdit.length) return;

        if (this.entitiesInEdit.length === 1) {
            return this.entitiesInEdit[0].categories;
        } else {
            console.error("TODO, sharedCats");
        }
    }

    get sharedTopics() {
        if (!this.entitiesInEdit.length) return;

        if (this.entitiesInEdit.length === 1) {
            return this.entitiesInEdit[0].topics;
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
        this.store.dispatch(EntityActions.addCategory(this.etype, cat));
    }
    addTag(tag: Tag) {
        this.store.dispatch(EntityActions.addTag(this.etype, tag));
    }
    addTopic(topic: Topic) {
        this.store.dispatch(EntityActions.attachTopicToEntity(this.etype, topic));
    }
    removeCat(id: number) {
        this.store.dispatch(EntityActions.removeCategory(this.etype, id));
    }
    removeTag(id: number) {
        this.store.dispatch(EntityActions.removeTag(this.etype, id));
    }
    removeTopic(id: number) {
        this.store.dispatch(EntityActions.detachTopicFromEntity(this.etype, id));
    }

    // TODO:
    canDeactivate() {
        return true;
    }
}
