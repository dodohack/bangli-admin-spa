/**
 * This is the single entity page base class
 */

import { OnInit, OnDestroy } from "@angular/core";
import { ViewChild }         from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Location }          from '@angular/common';
import { Store }             from '@ngrx/store';

import { AppState }          from '../../reducers';
import { hasEditorRole }     from '../../reducers';
import { EntitiesState }     from '../../reducers/entities';
import { AuthState }         from '../../reducers/auth';
import { CmsAttrsState }     from '../../reducers/cmsattrs';
import { ShopAttrsState }    from "../../reducers/shopattrs";
import { EntityActions }     from '../../actions';
import { AlertActions }      from "../../actions";

import { FroalaOptions }     from '../../models/froala.option';
import { Entity }            from '../../models';
import { ENTITY }            from "../../models";
import { GeoLocation }       from '../../models';
import { Category }          from '../../models';
import { Tag }               from '../../models';
import { Topic }             from '../../models';
import { zh_CN }             from '../../localization';

export class EntityPage implements OnInit, OnDestroy
{
    @ViewChild('entityForm') entityForm;
    // FIXME: We can't set entityForm.dirty property, we use a seperate flag
    // to track entity modification that can't be tracked by entityForm, such
    // as entity content and fake_published_at etc.
    entityDirty: boolean = false;
    // Force quit no matter if the entity is dirty or not.
    forceQuit: boolean = false;
    // FIXME: froala editor triggers content change at first time it initialize
    // the content, but actually the entity content is not modified yet.
    initialized: boolean = false;

    // Current entity, inputEntity is only used to initialize forala editor,
    // cause it is bugged when both input/output model are the same
    inputEntity: Entity;
    entity: Entity;

    // subscriptions
    subAuth: any;
    subCms: any;
    subShop: any;
    subEntities: any;
    subParams: any;


    authState:  AuthState;
    cmsState:   CmsAttrsState;
    shopState:  ShopAttrsState;
    entitiesState: EntitiesState;

    froalaEditor: any;
    
    // Hide datepicker default by default 
    dpHidden = true;

    constructor(protected etype: string,
                protected route: ActivatedRoute,
                protected location: Location,
                protected store: Store<AppState>) {}

    /**
     * Return entity reducer selector based on entity type
     */
    get selector() {
        switch (this.etype) {
            case ENTITY.CMS_POST:     return 'posts';
            case ENTITY.CMS_TOPIC:    return 'topics';
            case ENTITY.CMS_PAGE:     return 'pages';
            case ENTITY.CMS_DEAL:     return 'deals';
            case ENTITY.ADVERTISE:    return 'advertises';
            case ENTITY.NEWSLETTER:   return 'newletters';
            case ENTITY.PLACE:        return 'places';
            case ENTITY.ATTACHMENT:   return 'attachments';
            case ENTITY.COMMENT:      return 'comments';
            case ENTITY.SHOP_ORDER:   return 'orders';
            case ENTITY.SHOP_PRODUCT: return 'products';
            case ENTITY.SHOP_VOUCHER: return 'vouchers';
        }
    }

    ngOnInit() {
        this.subAuth = this.store.select<AuthState>('auth')
            .subscribe(authState => this.authState = authState);
        this.subCms = this.store.select<CmsAttrsState>('cms')
            .subscribe(cmsState => this.cmsState = cmsState);
        this.subShop = this.store.select<ShopAttrsState>('shop')
            .subscribe(shopState => this.shopState = shopState);
        
        // Dispatch an action to create or load an entity
        this.dispatchLoadEntity();
        // Load the entity
        this.loadEntity();
    }

    ngOnDestroy() {
        this.subAuth.unsubscribe();
        this.subCms.unsubscribe();
        this.subShop.unsubscribe();
        this.subEntities.unsubscribe();
        this.subParams.unsubscribe();
    }

    canDeactivate() {
        if (this.forceQuit) {
            this.store.dispatch(AlertActions
                .error('你的修改尚未保存, 你可以立即返回上个页面保存!'));
            return true;
        }

        if (this.entityForm.dirty || this.entityDirty) {
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
            if (Object.keys(params).length === 0) {
                // New a entity
                this.store.dispatch(EntityActions.newEntity(this.etype/* FIXME: current user id */));
            } else {
                // Edit a entity, we should make sure all entity is identified
                // with :id parameters.
                this.store.dispatch(EntityActions.loadEntity(this.etype, params['id']));
            }
        });
    }

    /**
     * Listen on ngrx/store, create a post from 'store' if state is changed
     */
    loadEntity() {
        this.subEntities = this.store.select<EntitiesState>(this.selector)
            .subscribe(entitiesState => {
                // Reset the form status so we can get a clean state
                //if (this.entityForm) this.entityForm.reset(); // bugged
                this.entityDirty = false;
                this.entitiesState = entitiesState;
                // When opening a single entity, 'editing' always contains 1 id
                // FIXME: Remove inputEntity after updating to new angular2-froala binding
                this.inputEntity = entitiesState.entities[entitiesState.idsEditing[0]];
                this.entity = Object.assign({}, this.inputEntity);
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
            this.initialized ? this.entityDirty = true : this.initialized = true;
            this.entity.content = $event;
        });
    }
    
    get isDraft()   { return this.entity.state === 'draft'; }
    get isPending() { return this.entity.state === 'pending'; }
    get isPublish() { return this.entity.state === 'publish'; }
    get myId() { return this.authState.users[this.authState.key].id; }
    get hasEditorRole() { return this.store.let(hasEditorRole()); }
    // Return current selected channel name for the entity
    get curChannel() {
        // Must convert channel_id from string to number
        let channels = this.cmsState.channels
            .filter(c => c.id === +this.entity.channel_id);
        return channels ? channels[0] : null;
    }

    get froalaOptions() { return FroalaOptions.getDefault(); }

    // Entity location, set or unset the location attr of an entity
    toggleGeoLocation(loc: GeoLocation) {
        this.store.dispatch(EntityActions.toggleGeoLocation(this.etype, loc));
    }

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

    /**
     * Return MySQL compatible date in GMT
     */
    GMT(value) {
        let d = new Date(value);
        let offset = d.getTimezoneOffset() / 60;
        // Patch user timezone offset, so we can get the GMT
        d.setHours(d.getHours() - offset);
        let newDate = d.toISOString().slice(0,19).split('T');
        return newDate[0] + ' ' + newDate[1];
    }
    
    set fakePublishAt(value) {
        let newDate = this.GMT(value);
        if (newDate != this.entity.fake_published_at) {
            this.entityDirty = true;
            this.entity.fake_published_at = newDate;
        }
    }
    get fakePublishAt() { return this.entity.fake_published_at; }

    // Restore current content to given revision
    restoreRevision(rid: number) {
        this.store.dispatch(EntityActions.applyRevision(this.etype, [this.entity.id, rid]));
        this.store.dispatch(AlertActions.warning('请确认版本恢复正确后点击保存到服务器'));
    }

    // TODO: Need to get back a save success status and enable canDeactivate
    // TODO: We can listen on 'alerts' changes, if a successful alert is 
    // back with the id, type of current post, we can say enable 
    // canDeactivate
    save() {
        this.store.dispatch(EntityActions.saveEntity(this.etype, this.entity));
    }
    save2Pending($event) {
        $event.preventDefault();
        this.entity.state = 'pending'; 
        this.save();
    }
    save2Draft($event)   {
        $event.preventDefault();
        this.entity.state = 'draft';  
        this.save();
    }
    save2Publish($event) {
        $event.preventDefault();
        // FIXME: Published_at can only be updated once
        this.entity.published_at = this.GMT(new Date());
        this.entity.state = 'publish'; 
        this.save();
    }

    cancelSave($event) {
        $event.preventDefault();
        this.forceQuit = true;
        this.location.back();
    }
}
