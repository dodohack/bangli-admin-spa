/**
 * This base class for all entities page
 */
import { HostListener }      from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Router }            from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { User }                 from '../../models';
import { Channel }              from '../../models';
import { Entity, EntityParams } from '../../models';
import { ENTITY_INFO }          from '../../models';
import { Category, Tag, Topic}  from '../../models';
import { Activity }             from '../../models';
import { AppState }             from '../../reducers';
import { EntityActions }        from '../../actions';

/**
 * TODO: Reference how ngrx-example-app (the books) does, especially for the
 * TODO: getter functions in each reducers and reducers/index and
 * TODO: loading/loaded status used in reducers(collection.ts).
 */
import {
    getCurDomain, getMyId,
    getAuthors, getAuthorsObject, getEditors, getEditorsObject, 
    getCmsChannels, getCmsChannelsObject, getCmsCategories, getLocations,
    getPostStates, getPageStates, getTopicStates,
    getIdsCurPage, getIdsEditing, getCurEntity,
    getIsLoading, getPaginator,
    getEntitiesCurPage } from '../../reducers';


export class EntitiesPage implements OnInit, OnDestroy
{
    // All subscribers, needs to unsubscribe on destory
    subMyId: any;
    subCmsCh: any;
    subEntity: any;
    subLoad: any;
    subActivityOn: any;
    subActivityOff: any;
    subParams: any;

    params: any;
    queryParams: any;

    // entity query parameter for api request
    entityParams: EntityParams = new EntityParams;

    myId:        number; // My id of current domain.
    isLoading:   boolean; // If the list is currently loading
    entity:      Entity; // First entity in idsEditing
    cmsChannels: Channel[];

    isLoading$:   Observable<boolean>;
    domain$:      Observable<any>;  // Current managed domain
    myId$:        Observable<number>; // User id of current domain
    authors$:     Observable<User[]>;
    editors$:     Observable<User[]>;
    authorsObject$: Observable<any>;
    cmsChannels$: Observable<Channel[]>;
    cmsChannelsObject$: Observable<any>;
    cmsCategories$: Observable<Category[]>;
    paginator$:   Observable<any>;
    entity$:      Observable<Entity>;
    entities$:    Observable<Entity[]>;
    idsCurPage$:  Observable<number[]>;
    idsEditing$:  Observable<number[]>;
    numEditing$:  Observable<number>; // Number of entity in editing
    
    /**
     * Constructor
     * @param etype     - entity type, it can be almost any entity except user
     * @param route
     * @param store
     * @param ping      - This is optional to post, topic and product.
     * @param pageless  - if the entity list page is a pageless list, such as
     *                    images, pageless list will auto load next page when
     *                    page reaches its bottom)
     */
    constructor(protected etype: string,    // Entity type
                protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected router: Router,
                protected pageless: boolean = false) {}

    ngOnInit() {
        this.isLoading$     = this.store.let(getIsLoading(this.etype));
        this.domain$        = this.store.let(getCurDomain());
        this.myId$          = this.store.let(getMyId());
        this.authors$       = this.store.let(getAuthors());
        this.editors$       = this.store.let(getEditors());
        this.authorsObject$ = this.store.let(getAuthorsObject());
        this.cmsChannels$   = this.store.let(getCmsChannels());
        this.cmsChannelsObject$ = this.store.let(getCmsChannelsObject());
        this.cmsCategories$ = this.store.let(getCmsCategories());
        this.paginator$     = this.store.let(getPaginator(this.etype));
        this.entity$        = this.store.let(getCurEntity(this.etype));
        this.entities$      = this.store.let(getEntitiesCurPage(this.etype));
        this.idsCurPage$    = this.store.let(getIdsCurPage(this.etype));
        this.idsEditing$    = this.store.let(getIdsEditing(this.etype));
        this.numEditing$    = this.idsEditing$.map(ids => ids.length);
        
        this.subMyId   = this.myId$.subscribe(id => this.myId = id);
        this.subCmsCh  = this.cmsChannels$.subscribe(c => this.cmsChannels = c);
        this.subEntity = this.entity$.subscribe(e => this.entity = e);
        this.subLoad   = this.isLoading$.subscribe(i => this.isLoading = i);

        this.dispatchLoadEntities();

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
    }

    ngOnDestroy() {
        //this.subPro.unsubscribe();
        this.subCmsCh.unsubscribe();
        this.subEntity.unsubscribe();
        this.subLoad.unsubscribe();
        //this.subActivityOn.unsubscribe();
        //this.subActivityOff.unsubscribe();
        this.subParams.unsubscribe();
    }

    /**
     * Kick an action to load entities when URL changes
     */
    dispatchLoadEntities() {
        this.subParams = Observable
            .merge(this.route.params, this.route.queryParams)
            .filter((p,i) => Object.keys(p).length !== 0)
            .subscribe(params => {
                // Compare if elements of url params change
                if (JSON.stringify(this.params) !== JSON.stringify(params)) {
                    this.setupEntityParams(params);
                    if (this.pageless)
                        this.store.dispatch(EntityActions
                            .loadEntitiesOnScroll(this.etype, this.entityParams));
                    else
                        this.store.dispatch(EntityActions
                            .loadEntities(this.etype, this.entityParams));
                }
                
            });
    }

    /**
     * Pageless loading
     * Load next page of entities when scroll to page bottom
     */
    @HostListener('window:scroll')
    loadEntitiesOnScroll() {
        if (this.pageless && !this.isLoading &&
            (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            setTimeout(() => {
                if (this.isLoading) return;
                if (this.params['state'])
                    this.router.navigate(['/', ENTITY_INFO[this.etype].slug,
                        'page', +this.params['page'] + 1, 'state', this.params['state']]);
                else
                    this.router.navigate(['/', ENTITY_INFO[this.etype].slug,
                        'page', +this.params['page'] + 1]);
            }, 10);
        }
    }

    setupEntityParams(params) {
        this.params = params;

        // Params
        this.entityParams.channel  = this.params['channel'];
        this.entityParams.cur_page = +this.params['page'] || 1;
        this.entityParams.state    = this.params['state'];

        // Query params
        this.entityParams.author   = this.params['author'];
        this.entityParams.editor   = this.params['editor'];
        this.entityParams.category = this.params['category'];
        this.entityParams.brand    = this.params['brand'];
        this.entityParams.datetype = this.params['datetype'];
        this.entityParams.datefrom = this.params['datefrom'];
        this.entityParams.dateto   = this.params['dateto'];
        this.entityParams.query    = this.params['query'];
    }

    get channelId() { 
        return this.cmsChannels.filter(c => c.slug == this.entityParams.channel);
    }
    
    /**
     * Create a entity on entity list page
     */
    newEntity() {
        this.store.dispatch(EntityActions.newEntity(this.etype, this.myId));
    }

    /**
     * FIXME: Merge it with batchSave()
     * Save single entity on entity list page
     */
    saveEntity() {
        this.store.dispatch(EntityActions.saveEntity(this.etype, this.entity));
    }
    save2Draft()   {
        this.store.dispatch(EntityActions.saveEntityAsDraft(this.etype, this.entity));
    }
    save2Publish() {
        this.store.dispatch(EntityActions.saveEntityAsPublish(this.etype, this.entity));
    }

    // In page edit single or multiple entities
    batchEdit(ids: number[]) {
        this.store.dispatch(EntityActions.batchEditEntities(this.etype, ids));
    }
    
    // Save single or multiple entities on entity list page
    batchSave() {
        console.log("TODO: implement batchSave entity");
    }

    // FIXME: Should be Cancel batch options
    cancelBatchEdit() {
        this.store.dispatch(EntityActions.cancelBatchEditEntities(this.etype));
    }

    // Edit previous entity in current posts list
    editPreviousEntity() {
        this.store.dispatch(EntityActions.batchEditPreviousEntity(this.etype));
    }

    // Edit next entity in current posts list
    editNextEntity() {
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

    /////////////////////////////////////////////////////////////////////////
    // NOTE: Following add/remove actions are the same as single post
    // Category, tag, topic add/remove events
    selectCat(cat: Category) {
        // Unselect a category if is is previously selected, vice versa
        if (cat.checked) this.removeCat(cat.id);
        else this.addCat(cat);
    }
    addCat(cat: Category) {
        //this.store.dispatch(EntityActions.attach(this.etype, cat));
    }
    addTag(tag: Tag) {
        //this.store.dispatch(EntityActions.addTag(this.etype, tag));
    }
    addTopic(topic: Topic) {
        //this.store.dispatch(EntityActions.attachTopicToEntity(this.etype, topic));
    }
    removeCat(id: number) {
        //this.store.dispatch(EntityActions.removeCategory(this.etype, id));
    }
    removeTag(id: number) {
        //this.store.dispatch(EntityActions.removeTag(this.etype, id));
    }
    removeTopic(id: number) {
        //this.store.dispatch(EntityActions.detachTopicFromEntity(this.etype, id));
    }

    // TODO:
    canDeactivate() {
        return true;
    }
}
