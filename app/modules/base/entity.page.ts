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
import { ENTITY_INFO }       from "../../models";
import { CREATIVE_TYPES }    from '../../models';
import { GeoLocation }       from '../../models';
import { Channel }           from '../../models';
import { Category }          from '../../models';
import { Tag }               from '../../models';
import { Topic }             from '../../models';
import { User }              from '../../models';
import { zh_CN }             from '../../localization';

import { GMT }               from '../../helper';

export class EntityPage implements OnInit, OnDestroy
{
    entityDirty: boolean = false;

    // Force quit no matter if the entity is dirty or not.
    forceQuit: boolean = false;
    
    // FIXME: froala editor triggers content change at first time it initialize
    // the content, but actually the entity content is not modified yet.
    initialized: boolean = false;

    // Current url params
    params: any;

    content: string; // local content

    entitiesState: EntitiesState;
    entities: Entity[];
    entity: Entity;
    inputEntity: Entity;

    // subscriptions
    subAuth: any;
    subCms: any;
    subShop: any;
    subEntities: any;
    subParams: any;

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
        
        // Dispatch an action to create or load an entity
        this.dispatchLoadEntity();
        this.loadEntity();
    }

    ngOnDestroy() {
        this.subCms.unsubscribe();
        this.subAuth.unsubscribe();
        this.subShop.unsubscribe();
        this.subParams.unsubscribe();
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

        if (this.entityDirty) {
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

    loadEntity() {
        this.subEntities = this.store
            .select<EntitiesState>(ENTITY_INFO[this.etype].selector)
            .subscribe(entitiesState => {
                this.entityDirty = false;
                let id = entitiesState.idsEditing[0];

                this.redirect2NewEntity(id);
                // Reset the form status so we can get a clean state
                //if (this.entityForm) this.entityForm.reset(); // bugged
                this.entitiesState = entitiesState;
                this.entities = entitiesState.entities;

                // When opening a single entity, 'editing' always contains 1 id
                // FIXME: Remove inputEntity after updating to new angular2-froala binding
                this.inputEntity = entitiesState.entities[id];
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
            //this.entity.content = $event;
            this.content = $event;
        });
    }

    get index() { return this.ids.indexOf(this.entity.id); }
    get ids() { return this.entitiesState.idsCurPage; }
    get creativeTypes() { return CREATIVE_TYPES; }
    get isDirty()   { return this.entityDirty; }
    get myId() { return this.auth.users[this.auth.key].id; }
    get hasEditorRole() { return this.store.let(hasEditorRole()); }
    get froalaOptions() { return FroalaOptions.getDefault(); }

    // Return current selected channel name for the entity
    get curChannel() {
        // Must convert channel_id from string to number
        let channels = this.cms.channels
            .filter(c => c.id === +this.entity.channel_id);
        return channels ? channels[0] : null;
    }

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
        this.autoSave();
        this.store.dispatch(EntityActions.addCategory(this.etype, cat));
    }
    addTag(tag: Tag) {
        this.autoSave();
        this.store.dispatch(EntityActions.addTag(this.etype, tag));
    }
    addTopic(topic: Topic) {
        this.autoSave();
        this.store.dispatch(EntityActions.attachTopicToEntity(this.etype, topic));
    }
    removeCat(id: number) {
        this.autoSave();
        this.store.dispatch(EntityActions.removeCategory(this.etype, id));
    }
    removeTag(id: number) {
        this.autoSave();        
        this.store.dispatch(EntityActions.removeTag(this.etype, id));
    }
    removeTopic(id: number) {
        this.autoSave();
        this.store.dispatch(EntityActions.detachTopicFromEntity(this.etype, id));
    }
    updateGeoLocation(loc: GeoLocation) {
        this.autoSave();
        this.store.dispatch(EntityActions.toggleGeoLocation(this.etype, loc));
    }
    
    updateTitle(title: string) {
        console.log("title changed to: ", title);
    }

    updateFakePublishedAt(date: string) {
        console.log("fake published at changed to: ", date);
    }

    /**
     *  Restore current content to given revision
     */
    restoreRevision(rid: number) {
        this.store.dispatch(EntityActions.applyRevision(this.etype, [this.entity.id, rid]));
        this.store.dispatch(AlertActions.warning('请确认版本恢复正确后点击保存到服务器'));
    }

    /**
     * Various save button and cancel
     */
    autoSave(entity) {
        if (entity.isDirty)
            this.store.dispatch(EntityActions.autoSave(this.etype, entity));
    }
    save(entity) {
        this.store.dispatch(EntityActions.saveEntity(this.etype, entity));
    }
    save2Pending(entity) {
        this.store.dispatch(EntityActions.saveEntityAsPending(this.etype, entity));        
    }
    save2Draft(entity) {
        this.store.dispatch(EntityActions.saveEntityAsDraft(this.etype, entity));        
    }
    save2Publish(entity) {
        this.store.dispatch(EntityActions.saveEntityAsPublish(this.etype, entity));
    }
    cancelSave() {
        this.forceQuit = true;
        this.location.back();
    }
}
