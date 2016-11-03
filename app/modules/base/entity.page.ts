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

import { FroalaEditorCompnoent } from 'ng2-froala-editor/ng2-froala-editor';
import { FroalaOptions }     from '../../models/froala.option';
import { KEYWORDS }          from '../../models';
import { Entity }            from '../../models';
import { TOPIC_RANKINGS }    from '../../models';
import { ENTITY_STATES }     from '../../models';
import { ENTITY_INFO }       from '../../models';
import { CREATIVE_TYPES }    from '../../models';
import { TOPIC_TYPES }       from '../../models';
import { TopicType }         from '../../models';
import { GeoLocation }       from '../../models';
import { Channel }           from '../../models';
import { Category }          from '../../models';
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
    getCmsCurChannelTopicTypes, getCmsTopics,
    getPostStates, getPageStates, getTopicStates,
    getIdsCurPage, getIdsEditing, getCurEntity, getCurEntityId,
    getIsLoading, getPaginator, getCurEntityChannel,
    getEntityDirtyMask, getCurEntityAuthor,
    getCurEntityEditor, getCurEntityTopicType,
    getCurEntityKeywordsAsArray,
    getEntitiesCurPage, getCurEntityHasDeal,
    getCurEntityIntro, getCurEntityContent,
    getCurEntityDealIntro, getCurEntityDealContent} from '../../reducers';

export abstract class EntityPage implements OnInit, OnDestroy
{
    // Force quit no matter if the entity is dirty or not.
    forceQuit = false;

    // Use to keep track if url parameters is really changed.
    params: any;
    
    froalaModel: string; // A temp storage for all content modified by froala
    editor: any;         // Froala editor instance

    dirtyMask: string[];      // Entity dirty mask
    entity: Entity;           // Current entity
    profile: User;            // Current user profile
    domain: Domain;           // Current domain
    cmsTopics: Topic[];       // Filtered cms topics

    isLoading$:   Observable<boolean>;
    dirtyMask$:   Observable<string[]>;
    domain$:      Observable<Domain>;
    profile$:     Observable<User>; // User info of current domain
    authors$:     Observable<User[]>;
    authorsObj$:  Observable<any>;
    editors$:     Observable<User[]>;
    geoLocations$: Observable<GeoLocation[]>;
    cmsChannels$: Observable<Channel[]>;     // All cms channels
    cmsCategories$: Observable<Category[]>;  // Categories of current channel
    cmsTopicTypes$: Observable<TopicType[]>; // Topic types of current channel
    cmsTopics$:   Observable<Topic[]>;      // Candidates topics
    paginator$:   Observable<any>;
    id$:          Observable<number>;
    entity$:      Observable<Entity>;
    author$:      Observable<User>;
    editor$:      Observable<User>;
    channel$:     Observable<Channel>;   // Current entity channel id
    keywords$:    Observable<string[]>;  // Keywords array of current topic
    intro$:       Observable<string>;    // Topic only introduction
    content$:     Observable<string>;
    deal_intro$:  Observable<string>;    // Deal topic only intro
    deal_content$:Observable<string>;    // Deal topic only content
    topicType$:   Observable<TopicType>; // Topic only type
    hasDeal$:     Observable<boolean>;   // Topic only attributes
    entities$:    Observable<Entity[]>;
    idsCurPage$:  Observable<number[]>;

    // subscriptions
    subDomain: any;
    subPro: any;
    subCh: any;
    subTopics: any;
    subEntity: any;
    subDirty: any;
    subParams: any;
    subAS: any;
    subID: any;

    constructor(protected etype: string,
                protected route: ActivatedRoute,
                protected location: Location,
                protected store: Store<AppState>,
                protected router: Router) {}

    ngOnInit() {
        this.isLoading$     = this.store.let(getIsLoading(this.etype));
        this.dirtyMask$     = this.store.let(getEntityDirtyMask(this.etype));
        this.domain$        = this.store.let(getCurDomain());
        this.profile$       = this.store.let(getCurProfile());
        this.authors$       = this.store.let(getAuthors());
        this.editors$       = this.store.let(getEditors());
        this.authorsObj$    = this.store.let(getAuthorsObject());
        this.geoLocations$  = this.store.let(getLocations());
        this.cmsChannels$   = this.store.let(getCmsChannels());
        this.cmsCategories$ = this.store.let(getCmsCurChannelCategories());
        this.cmsTopicTypes$ = this.store.let(getCmsCurChannelTopicTypes());
        this.cmsTopics$     = this.store.let(getCmsTopics());
        this.paginator$     = this.store.let(getPaginator(this.etype));
        this.id$            = this.store.let(getCurEntityId(this.etype));
        this.entity$        = this.store.let(getCurEntity(this.etype));
        this.author$        = this.store.let(getCurEntityAuthor(this.etype));
        this.editor$        = this.store.let(getCurEntityEditor(this.etype));
        this.channel$       = this.store.let(getCurEntityChannel(this.etype));
        this.entities$      = this.store.let(getEntitiesCurPage(this.etype));
        this.idsCurPage$    = this.store.let(getIdsCurPage(this.etype));
        this.intro$         = this.store.let(getCurEntityIntro(this.etype));
        this.content$       = this.store.let(getCurEntityContent(this.etype));
        this.deal_intro$    = this.store.let(getCurEntityDealIntro(this.etype));
        this.deal_content$  = this.store.let(getCurEntityDealContent(this.etype));
        this.keywords$      = this.store.let(getCurEntityKeywordsAsArray(this.etype));
        this.topicType$     = this.store.let(getCurEntityTopicType(this.etype));
        this.hasDeal$       = this.store.let(getCurEntityHasDeal(this.etype));

        this.subDomain  = this.domain$.subscribe(d => this.domain = d);
        this.subPro     = this.profile$.subscribe(p => this.profile = p);
        this.subEntity  = this.entity$
            .subscribe(e => this.entity = Object.assign({}, e));

        // Update the channel in CmsAttrStates with entity channel
        this.subCh      = this.channel$.map(ch => ch.id).distinctUntilChanged()
            .subscribe(cid => this.store.dispatch(CmsAttrActions.switchChannel(cid)));

        this.subTopics  = this.cmsTopics$
            .subscribe(topics => this.cmsTopics = topics);

        this.subDirty   = this.dirtyMask$.subscribe(m => this.dirtyMask = m);

        // Dispatch an action to create or load an entity
        this.dispatchLoadEntity();

        // Redirect newly created entity url
        this.redirectNewEntity();

        // Auto saving setup
        this.autoSave();
    }

    ngOnDestroy() {
        this.subDomain.unsubscribe();
        this.subPro.unsubscribe();
        this.subEntity.unsubscribe();
        this.subCh.unsubscribe();
        this.subTopics.unsubscribe();
        this.subParams.unsubscribe();
        this.subDirty.unsubscribe();
        this.subAS.unsubscribe();
        this.subID.unsubscribe();
    }

    /**
     * FIXME: Refactor
     */
    canDeactivate() {
        let status = true;
        let msg;

        if (this.forceQuit) {
            msg = '你的修改尚未保存, 你可以立即返回上个页面保存!';
            status = true;
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
        this.subParams = this.route.params.distinctUntilChanged()
            .subscribe(params => {
                this.params = params;
                if (this.isNewEntity) {
                    this.store.dispatch(EntityActions
                        .newEntity(this.etype, this.profile));
                } else {
                    this.store.dispatch(EntityActions
                        .loadEntity(this.etype, params['id']));
                }
            });
    }

    /**
     * Redirect new entity url to url with entity id
     */
    redirectNewEntity() {
        this.subID = this.id$.filter(id => id > 0).distinctUntilChanged()
            .subscribe(id => {
                if (this.isNewEntity) {
                    this.router.navigate(['/', ENTITY_INFO[this.etype].slug, id]);
                }
            });
    }

    abstract get zh();
    abstract get previewUrl(): string;

    get isNewEntity() { return Object.keys(this.params).length === 0; }
    get isDirty() { return this.dirtyMask && this.dirtyMask.length; }
    get entityStates() { return ENTITY_STATES; }
    get creativeTypes() { return CREATIVE_TYPES; }
    get topicTypes() { return TOPIC_TYPES; }
    get froalaOptions() { return FroalaOptions.getDefault(); }
    get rankings() { return TOPIC_RANKINGS; }
    gmt(value: string) { return GMT(value); }

    /**
     * Set/get a keywords prompt list
     */
    get keywords() {
        if (this.entity) {
            if (this.entity.anchor_text)
                return KEYWORDS.map(k => k.replace('[KEY]', this.entity.anchor_text));
            else if (this.entity.title)
                return KEYWORDS.map(k => k.replace('[KEY]', this.entity.title));
        } else {
            return ['请先输入标题或锚文本'];
        }
    }

    // Search topics from API server
    searchTopic(topicTypeId: number, text: string) {
        this.store.dispatch(CmsAttrActions.searchTopics(topicTypeId, text));
    }

    // Get topics belongs to given topic type
    topicsOfType(ttype: TopicType) {
        if (this.cmsTopics)
            return this.cmsTopics.filter(t => t.type_id === ttype.id);
    }

    /**
     * Attach/detach a relationship to/from an entity, update an attribute
     * of an entity, attach/detach/update string properity from entity.
     * There 6 are generic functions that can handle all the modification
     * to any entity.
     */
    toggleAttr(key: string, value: any) {
        if (value.checked) this.detach(key, value);
        else               this.attach(key, value);
    }
    // Attach hasMany attributes
    attach(key: string, value: any) {
        this.store.dispatch(EntityActions.attach(this.etype, key, value));
    }
    attachStr(key: string, value: any) {
        this.store.dispatch(EntityActions.attach(this.etype, key, value.text));
    }
    // Detach hasMany attributes
    detach(key: string, value: any) {
        this.store.dispatch(EntityActions.detach(this.etype, key, value));
    }
    detachStr(key: string, value: any) {
        this.store.dispatch(EntityActions.detach(this.etype, key, value.text));
    }
    // Update hasOne/string/single attributes of entity
    update(key: string, value: any) {
        this.store.dispatch(EntityActions.update(this.etype, key, value));
    }

    updateFakePublishedAt(date: string) {
        let d1 = new Date(date);
        let d2 = new Date(this.entity.fake_published_at);
        if (d1.toISOString() === d2.toISOString()) return;
        this.update('fake_published_at', GMT(date));
    }

    /**
     * Listen on froala editor events
     */
    onFroalaInitialized(key: string) {
        this.editor = FroalaEditorCompnoent.getFroalaInstance();
        // Kick an action to update content when it changes.
        this.editor.on('froalaEditor.contentChanged', (e, editor) => {
            this.update(key, this.froalaModel);
        });
    }

    /**
     * Save entity to API server
     */
    save() {
        this.store.dispatch(EntityActions
            .saveEntity(this.etype, this.entity, this.dirtyMask));
    }

    /**
     * Save entity automatically, do not do this for new entity
     */
    autoSave() {
        this.subAS = Observable.interval(10000).subscribe(() => {
            if (this.isDirty && !this.isNewEntity)
                this.store.dispatch(EntityActions
                    .autoSave(this.etype, this.entity, this.dirtyMask));
        });
    }

    cancelSave() {
        this.forceQuit = true;
        this.location.back();
    }
}
