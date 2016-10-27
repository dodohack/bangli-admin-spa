/**
 * This is the single entity page base class
 */

import { OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute }    from '@angular/router';
import { Location }          from '@angular/common';
import { Router }            from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { AppState }          from '../../reducers';
import { EntityActions }     from '../../actions';
import { CmsAttrActions }    from '../../actions';
import { AlertActions }      from "../../actions";

import { FroalaOptions }     from '../../models/froala.option';
import { Entity }            from '../../models';
import { CREATIVE_TYPES }    from '../../models';
import { TOPIC_TYPES }       from '../../models';
import { TopicType }         from '../../models';
import { GeoLocation }       from '../../models';
import { Channel }           from '../../models';
import { Category }          from '../../models';
import { Tag }               from '../../models';
import { Topic }             from '../../models';
import { User }              from '../../models';
import { Domain }            from '../../models';

import { GMT }               from '../../helper';

/**
 * NOTE: We use these functions to get a fine grain elements from
 * EntitiesState, so that when some elements get updated, we do not
 * need to refresh all the elements. E.g. when add/remove a category
 * to the entity, will well get everything reset from the single
 * subscription to entitiesState; but we don't get everything reset
 * if we subscribe to a smaller elements.
 */
import {
    getCurDomain, getCurProfile, getIsDirty,
    getAuthors, getAuthorsObject, getEditors, getEditorsObject,
    getCmsChannels, getCmsCurChannelCategories, getLocations,
    getCmsCurChannelTopicTypes,
    getPostStates, getPageStates, getTopicStates,
    getIdsCurPage, getIdsEditing, getCurEntity,
    getIsLoading, getPaginator, getCurEntityChannelId,
    getEntitiesCurPage, getCurEntityHasDeal,
    getCurEntityIntro, getCurEntityContent} from '../../reducers';



export abstract class EntityPage implements OnInit, OnDestroy
{
    // Force quit no matter if the entity is dirty or not.
    forceQuit = false;

    // Use to keep track if url parameters is really changed.
    params: any;
    
    // FIXME: froala editor triggers content change at first time it initialize
    // the content, but actually the entity content is not modified yet.
    introInitialized    = false;
    contentInitialized = false;

    isDirty        = false;   // Entity dirty bit
    entity: Entity;           // Current entity
    profile: User;            // Current user profile
    domain: Domain;           // Current domain

    isLoading$:   Observable<boolean>;
    isDirty$:     Observable<boolean>;
    domain$:      Observable<Domain>;
    profile$:     Observable<User>; // User info of current domain
    authors$:     Observable<User[]>;
    authorsObj$:  Observable<any>;
    editors$:     Observable<User[]>;
    geoLocations$: Observable<GeoLocation[]>;
    cmsChannels$: Observable<Channel[]>;     // All cms channels
    cmsCategories$: Observable<Category[]>;  // Categories of current channel
    cmsTopicTypes$: Observable<TopicType[]>; // Topic types of current channel
    paginator$:   Observable<any>;
    entity$:      Observable<Entity>;
    channelId$:   Observable<number>;    // Current entity channel id
    intro$:       Observable<string>;    // Topic only introduction
    content$:     Observable<string>;
    hasDeal$:     Observable<boolean>;   // Topic only attributes
    entities$:    Observable<Entity[]>;
    idsCurPage$:  Observable<number[]>;

    // subscriptions
    subDomain: any;
    subPro: any;
    subDirty: any;
    subCh: any;
    subEntity: any;
    subParams: any;
    subTimer: any;

    isNewEntity: boolean;
    // A flag to turn deactivate guard off
    _canDeactivate: boolean;

    constructor(protected etype: string,
                protected route: ActivatedRoute,
                protected location: Location,
                protected store: Store<AppState>,
                protected router: Router) {}

    ngOnInit() {
        this.isLoading$     = this.store.let(getIsLoading(this.etype));
        this.isDirty$       = this.store.let(getIsDirty(this.etype));
        this.domain$        = this.store.let(getCurDomain());
        this.profile$       = this.store.let(getCurProfile());
        this.authors$       = this.store.let(getAuthors());
        this.editors$       = this.store.let(getEditors());
        this.authorsObj$    = this.store.let(getAuthorsObject());
        this.geoLocations$  = this.store.let(getLocations());
        this.cmsChannels$   = this.store.let(getCmsChannels());
        this.cmsCategories$ = this.store.let(getCmsCurChannelCategories());
        this.cmsTopicTypes$ = this.store.let(getCmsCurChannelTopicTypes());
        this.paginator$     = this.store.let(getPaginator(this.etype));
        this.entity$        = this.store.let(getCurEntity(this.etype));
        this.channelId$     = this.store.let(getCurEntityChannelId(this.etype));
        this.entities$      = this.store.let(getEntitiesCurPage(this.etype));
        this.idsCurPage$    = this.store.let(getIdsCurPage(this.etype));
        this.intro$         = this.store.let(getCurEntityIntro(this.etype));
        this.content$       = this.store.let(getCurEntityContent(this.etype));
        this.hasDeal$       = this.store.let(getCurEntityHasDeal(this.etype));

        this.subDomain  = this.domain$.subscribe(d => this.domain = d);
        this.subPro     = this.profile$.subscribe(p => this.profile = p);
        this.subDirty   = this.isDirty$.subscribe(i => this.isDirty = i);
        this.subEntity  = this.entity$
            .subscribe(e => this.entity = Object.assign({}, e));

        // Update the channel in CmsAttrStates with entity channel
        this.subCh      = this.channelId$.subscribe(id => this.store
                .dispatch(CmsAttrActions.switchChannel(id)));

        // Dispatch an action to create or load an entity
        this.dispatchLoadEntity();
        // Init auto save timer
        this.autoSave();
    }

    ngOnDestroy() {
        this.subDomain.unsubscribe();
        this.subPro.unsubscribe();
        this.subDirty.unsubscribe();
        this.subEntity.unsubscribe();
        this.subCh.unsubscribe();
        this.subParams.unsubscribe();
        this.subTimer.unsubscribe();
    }

    canDeactivate() {
        let status = true;
        let msg;
        // When this is set, we allow current page to be deactivate
        if (this._canDeactivate) return true;

        if (this.forceQuit) {
            msg = '你的修改尚未保存, 你可以立即返回上个页面保存!';
            status = false;
        }

        if (!this.forceQuit && this.isDirty) {
            msg = '请先保存当前更改，或取消保存';
            status = false;
        }

        // Alert if can't deactive safely
        if (!status) this.store.dispatch(AlertActions.error(msg));
        return status;
    }

    /**
     * Kick an action to load the entity when URL changes
     */
    dispatchLoadEntity() {
        this.subParams = this.route.params.subscribe(params => {
            if (JSON.stringify(this.params) !== JSON.stringify(params)) {
                if (Object.keys(params).length === 0) {
                    // Create a new entity
                    this.isNewEntity = true;
                    this.store.dispatch(EntityActions
                        .newEntity(this.etype, this.profile.id));
                } else {
                    // Edit an entity by given id
                    this.isNewEntity = false;
                    this.store.dispatch(EntityActions
                        .loadEntity(this.etype, params['id']));
                }
            }
        });
    }



    /**
     * Topic introduction changed event triggered by froala editor
     */
    froalaIntroChanged($event) {
        // If no timeout set, the editor will throw an exception
        setTimeout(() => {
            // Set initialized state or set entity content dirty
            console.log("intro changed: ", $event);
            this.introInitialized ?
                this.isDirty = true : this.introInitialized = true;
            this.entity.intro = $event;
        });
    }

    /**
     * Entity content changed event triggered by froala editor
     */
    froalaContentChanged($event) {
        // If no timeout set, the editor will throw an exception
        setTimeout(() => {
            // Set initialized state or set entity content dirty
            console.log("content changed: ", $event);
            this.contentInitialized ?
                this.isDirty = true : this.contentInitialized = true;
            this.entity.content = $event;
        });
    }

    abstract get previewUrl(): string;

    get creativeTypes() { return CREATIVE_TYPES; }
    get topicTypes() { return TOPIC_TYPES; }
    get froalaOptions() { return FroalaOptions.getDefault(); }
    get froalaSimplifiedOptions() { return FroalaOptions.getSimplified(); }

    gmt(value: string) { return GMT(value); }

    /**
     * Redirect /entity/new to /entity/:id once new entity is saved
     */
    redirect2NewEntity(id) {
        // Changing from a newly created entity to a saved entity
        /*
        if (this.isNewEntity && id !== 0) {
            this._canDeactivate = true;
            this.isNewEntity = false;
            this.router.navigate(['/', ENTITY_INFO[this.etype].slug, id]);
        }
        */
    }

    // Search topics from API server
    searchTopic(text: string) {
        this.store.dispatch(CmsAttrActions.searchTopics(text));
    }

    /**
     * Various action to add/remove entity attributes 
     */
    updateCat(cat: Category) {
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

    updateChannel(id: number) {
        console.log("Update current entity channel to : ", id);
        this.store.dispatch(EntityActions.updateChannel(this.etype, id));
    }

    updateGeoLocation(loc: GeoLocation) {
        this.store.dispatch(EntityActions.toggleGeoLocation(this.etype, loc));
    }

    updateTitle(title: string) {
        this.store.dispatch(EntityActions.updateTitle(this.etype, title));
    }

    updateFakePublishedAt(date: string) {
        let d1 = new Date(date);
        let d2 = new Date(this.entity.fake_published_at);
        if (d1.toISOString() === d2.toISOString()) return;
        this.store.dispatch(EntityActions.updateFakePublishedAt(this.etype, date));
    }
    
    /**
     *  Restore current content to given revision
     */
    restoreRevision(rid: number) {
        this.store.dispatch(EntityActions.applyRevision(this.etype, [this.entity.id, rid]));
        this.store.dispatch(AlertActions.warning('请确认版本恢复正确后点击保存到服务器'));
    }

    /**
     * Automatically save entity in an interval
     */
    autoSave() {
        // Do the saving in every 10s.
        this.subTimer = Observable.interval(10000).subscribe(x => {
            // Save entity with content to server
            if (this.isDirty) {
                this.store.dispatch(EntityActions.autoSave(this.etype, this.entity));
                // Save entity except content to server
                //this.store.dispatch(EntityActions.autoSaveAttributes(this.etype, this.entity));
            }

            // Also ping server to set editing lock state
        });
    }

    /**
     * Various save button and cancel
     */
    save() {
        this.store.dispatch(EntityActions.saveEntity(this.etype, this.entity));
    }
    save2Pending() {
        this.store.dispatch(EntityActions.saveEntityAsPending(this.etype, this.entity));
    }
    save2Draft() {
        this.store.dispatch(EntityActions.saveEntityAsDraft(this.etype, this.entity));
    }
    save2Publish() {
        this.store.dispatch(EntityActions.saveEntityAsPublish(this.etype, this.entity));
    }
    cancelSave() {
        this.forceQuit = true;
        this.location.back();
    }
}
