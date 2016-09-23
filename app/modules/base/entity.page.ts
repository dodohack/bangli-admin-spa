/**
 * This is the single entity page base class
 */

import { OnInit, OnDestroy } from "@angular/core";
import { ViewChild }         from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';

import { AppState }          from '../../reducers';
import { hasEditorRole }     from '../../reducers';
import { EntitiesState }     from '../../reducers/entities';
import { EntitiesStateGroup }from '../../reducers/entities';
import { AuthState }         from '../../reducers/auth';
import { CmsAttrsState }     from '../../reducers/cmsattrs';
import { ShopAttrsState }    from "../../reducers/shopattrs";
import { EntityActions }     from '../../actions';
import { AlertActions }      from "../../actions";

import { FroalaOptions }     from '../../models/froala.option';
import { Entity }            from '../../models';
import { Category }          from '../../models';
import { Tag }               from '../../models';
import { Topic }             from '../../models';
import { zh_CN }             from '../../localization';

export class EntityPage implements OnInit, OnDestroy
{
    @ViewChild('postForm') postForm;

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

    // Current entity, inputEntity is only used to initialize forala editor, 
    // cause it is bugged when both input/output model are the same
    inputEntity: Entity;
    entity: Entity;

    froalaEditor: any;

    constructor(private etype: string,
                protected route: ActivatedRoute,
                protected store: Store<AppState>) { }

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

    /**
     * Kick an action to load the entity when URL changes
     */
    dispatchLoadEntity() {
        this.subParams = this.route.params.subscribe(params => {
            if (Object.keys(params).length === 0) // New a post
                this.store.dispatch(EntityActions.newEntity(this.etype/* FIXME: current user id */));
            else                                  // Edit a post
                this.store.dispatch(EntityActions.loadEntity(this.etype, +params['id']));
        });
    }

    /**
     * Listen on ngrx/store, create a post from 'store' if state is changed
     */
    loadEntity() {
        this.subEntities = this.store.select<EntitiesStateGroup>('entities')
            .subscribe(stateGroup => {
                if (stateGroup && stateGroup[this.etype]) {
                    this.entitiesState = stateGroup[this.etype];
                    // When opening a single entity, 'editing' always contains 1 id
                    // FIXME: Remove inputEntity after updating to new angular2-froala binding
                    this.inputEntity = this.entitiesState.entities[this.entitiesState.editing[0]];
                    this.entity = Object.assign({}, this.inputEntity);
                }
        });
    }

    get isDraft()   { return this.entity.state === 'draft'; }
    get isPending() { return this.entity.state === 'pending'; }
    get isPublish() { return this.entity.state === 'publish'; }
    get myId() { return this.authState.users[this.authState.key].id; }
    get hasEditorRole() { return this.store.let(hasEditorRole()); }

    get froalaOptions() { return FroalaOptions.getDefault(); }

    contentChanged($event) {
        // If no timeout set, the editor will throw an exception
        setTimeout(() => {
            console.log("Entity content changed!");
            this.entity.content = $event;
        });
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
        this.store.dispatch(EntityActions.saveEntity(this.entity));
    }
    save2Pending() { this.entity.state = 'pending'; this.save(); }
    save2Draft()   { this.entity.state = 'draft';   this.save(); }
    save2Publish() { this.entity.state = 'publish'; this.save(); }
}
