/**
 * This is the single entity page base class
 */

import { OnInit, OnDestroy } from "@angular/core";
import { ViewChild }         from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Location }          from '@angular/common';
import { Router }            from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { AppState }          from '../../reducers';
import { AuthState }         from '../../reducers/auth';
import { CmsAttrsState }     from '../../reducers/cmsattrs';
import { ShopAttrsState }    from "../../reducers/shopattrs";
import { EntityActions }     from '../../actions';
import { AlertActions }      from "../../actions";

import { FroalaOptions }     from '../../models/froala.option';
import { Entity }            from '../../models';
import { ENTITY }            from "../../models";
import { ENTITY_INFO }       from "../../models";
import { CREATIVE_TYPES }    from '../../models';
import { GeoLocation }       from '../../models';
import { Channel }           from '../../models';
import { Category }          from '../../models';
import { Tag }               from '../../models';
import { Topic }             from '../../models';
import { User }              from '../../models';

import { GMT }               from '../../helper';

/**
 * NOTE: We use these functions to get a fine grain elements from
 * EntitiesState, so that when some elements get updated, we do not
 * need to refresh all the elements. E.g. when add/remove a category
 * to the entity, will well get everything reset from the single
 * subscription to entitiesState; but we don't get everything reset
 * if we subscribe to a smaller elements.
 */
import { getIsDirty, getIdsCurPage, getEntitiesCurPage, 
    getCurEntity, getCurEntityContent } from '../../reducers';

export abstract class EntityPage implements OnInit, OnDestroy
{
    // Force quit no matter if the entity is dirty or not.
    forceQuit: boolean = false;
    
    // FIXME: froala editor triggers content change at first time it initialize
    // the content, but actually the entity content is not modified yet.
    initialized: boolean = false;

    // Current url params
    params: any;

    ids: number[];
    content: string;              // Entity content
    isDirty: boolean;             // Entity dirty bit
    isContentDirty: boolean;      // A separate content dirty bit
    entities: Entity[];           // Entites of current page
    entity: Entity;               // Current entity

    // subscriptions
    subAuth: any;
    subCms: any;
    subShop: any;
    subIds: any;
    subDirty: any;
    subEntities: any;
    subEntity: any;
    subContent: any;
    subParams: any;
    subTimer: any;

    // TODO: DEPRECATE THESE 3
    auth: AuthState;
    shop: ShopAttrsState;
    cms:  CmsAttrsState;

    isNewEntity: boolean;
    // A flag to turn deactivate guard off
    _canDeactivate: boolean;

    constructor(protected etype: string,
                protected route: ActivatedRoute,
                protected location: Location,
                protected store: Store<AppState>,
                protected router: Router) {}

    ngOnInit() {
        this.subAuth = this.store.select<AuthState>('auth')
            .subscribe(auth => this.auth = auth);
        this.subCms = this.store.select<CmsAttrsState>('cms')
            .subscribe(cms => this.cms = cms);
        this.subShop = this.store.select<ShopAttrsState>('shop')
            .subscribe(shop => this.shop = shop);

        this.subIds  = this.store.let(getIdsCurPage(this.etype))
            .subscribe(i => this.ids = i);
        this.subDirty = this.store.let(getIsDirty(this.etype))
            .subscribe(i => {
                console.log("is dirty: ", i);
                this.isDirty = i;
            });
        this.subEntities  = this.store.let(getEntitiesCurPage(this.etype))
            .subscribe(e => this.entities = e);
        this.subEntity = this.store.let(getCurEntity(this.etype))
            .subscribe(e => this.entity = e);
        this.subContent = this.store.let(getCurEntityContent(this.etype))
            .subscribe(c => {this.initialized = false;
                this.isContentDirty = false; this.content = c;});

        // Dispatch an action to create or load an entity
        this.dispatchLoadEntity();
        //this.loadEntity();
        
        // Init auto save timer
        this.autoSave();
    }

    ngOnDestroy() {
        this.subCms.unsubscribe();
        this.subAuth.unsubscribe();
        this.subShop.unsubscribe();
        this.subIds.unsubscribe();
        this.subDirty.unsubscribe();
        this.subEntities.unsubscribe();
        this.subEntity.unsubscribe();
        this.subContent.unsubscribe();
        this.subParams.unsubscribe();
        this.subTimer.unsubscribe();
    }

    canDeactivate() {
        // When this is set, we allow current page to be deactivate
        if (this._canDeactivate) {
            return true;
        }

        if (this.forceQuit) {
            this.store.dispatch(AlertActions
                .error('你的修改尚未保存, 你可以立即返回上个页面保存!'));
            return true;
        }

        if (this.isDirty) {
            this.store.dispatch(AlertActions.error('请先保存当前更改，或取消保存'));
            return false;
        } else {
            return true;
        }
    }

    /**
     * Kick an action to load the entity when URL changes
     */
    dispatchLoadEntity() {
        this.subParams = this.route.params.subscribe(params => {
            if (JSON.stringify(this.params) !== JSON.stringify(params)) {
                this.params = params;

                if (Object.keys(params).length === 0) {
                    // Create a new entity
                    this.isNewEntity = true;
                    this.store.dispatch(EntityActions
                        .newEntity(this.etype, this.myId));
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
     * Entity content changed event triggered by froala editor
     * @param $event
     */
    contentChanged($event) {
        // If no timeout set, the editor will throw an exception
        setTimeout(() => {
            // Set initialized state or set entity content dirty
            console.log("content changed!");
            this.initialized ? this.isContentDirty = true : this.initialized = true;
            this.content = $event;
        });
    }

    abstract get previewUrl(): string;

    get frontendUrl() { return this.auth.domains[this.auth.key].url + '/'; }
    get myId() { return this.auth.users[this.auth.key].id; }

    get creativeTypes() { return CREATIVE_TYPES; }
    get froalaOptions() { return FroalaOptions.getDefault(); }

    // Return current selected channel name for the entity
    get curChannel() {
        // Must convert channel_id from string to number
        let channels = this.cms.channels
            .filter(c => c.id === +this.entity.channel_id);
        return channels ? channels[0] : null;
    }
    
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
    updateGeoLocation(loc: GeoLocation) {
        this.store.dispatch(EntityActions.toggleGeoLocation(this.etype, loc));
    }

    updateTitle(title: string) {
        this.store.dispatch(EntityActions.updateTitle(this.etype, title));
    }

    updateFakePublishedAt(date: string) {
        if (Date(date) === Date(this.entity.fake_published_at)) return;
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
            if (this.isContentDirty) {
                this.store.dispatch(EntityActions.updateContent(this.etype, this.content));
                this.store.dispatch(EntityActions.autoSave(this.etype, this.entity));
            } else if (this.isDirty) {
                // Save entity except content to server
                this.store.dispatch(EntityActions.autoSaveAttributes(this.etype, this.entity));
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
