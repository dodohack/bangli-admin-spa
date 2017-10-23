/**
 * This is the single entity page base class
 */

import { OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute }    from '@angular/router';
import { Location }          from '@angular/common';
import { Router }            from '@angular/router';
import { FormControl }       from '@angular/forms';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { AppState }          from '../../reducers';
import * as EntityActions    from '../../actions/entity';
import * as CmsAttrActions   from '../../actions/cmsattr';
import * as AlertActions     from "../../actions/alert";
import { CacheSingleton }    from '../../effects/cache.singleton';

import { FroalaOptions }         from '../../models/froala.option';
import { KEYWORDS }              from '../../models';
import { Entity, EntityParams }  from '../../models';
import { ENTITY }            from '../../models';
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

import { THUMBS }            from '../../../.config';

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
    getCmsTopicTypes, getCmsCategories,
    getPostStates, getPageStates, getTopicStates,
    getIdsCurPage, getIdsEditing, getCurEntity, getCurEntityId,
    getIsLoading, getPaginator, getCurEntityChannel,
    getEntityDirtyMask, getCurEntityAuthor,
    getCurEntityEditor, getCurEntityTopicType,
    getCurEntityKeywordsAsArray,
    getEntitiesCurPage,
    getCurEntityIntro, getCurEntityContent
} from '../../reducers';

export abstract class EntityPage implements OnInit, OnDestroy
{
    cache = CacheSingleton.getInstance();

    // Main content form event
    contentControl = new FormControl();

    // A flag used to mark froala editor is initialized or not, so let it
    // ignore first time froalaModelChange.
    isEditorInitialized: boolean = false;

    // Local version of entity content, updated by froala editor
    content: string;

    // Force quit no matter if the entity is dirty or not.
    forceQuit = false;

    // Use to keep track if url parameters is really changed.
    params: any;

    // Gallery modal image list parameters
    galleryParams: EntityParams;
    
    froalaModel: string; // A temp storage for all content modified by froala
    key: string;         // Index key of current editing content name
    editor: any;         // Froala editor instance

    dirtyMask: string[];      // Entity dirty mask
    entity: Entity;           // Current entity
    profile: User;            // Current user profile
    domain: Domain;           // Current domain
    cmsTopics: Topic[];       // Filtered cms topics
    cmsTopicTypes: TopicType[];

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
    topicType$:   Observable<TopicType>; // Topic only type
    entities$:    Observable<Entity[]>;
    idsCurPage$:  Observable<number[]>;

    images$:      Observable<Entity[]>;  // Images for gallery modal
    imageIds$:    Observable<number[]>; // Id index for images

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
    subContent: any;
    subCtCtrl: any;
    subTT: any;

    constructor(protected etype: string,
                protected route: ActivatedRoute,
                protected location: Location,
                protected store: Store<AppState>,
                protected router: Router) {}

    ngOnInit() {
        this.isLoading$     = this.store.select(getIsLoading(this.etype));
        this.dirtyMask$     = this.store.select(getEntityDirtyMask(this.etype));
        this.domain$        = this.store.select(getCurDomain);
        this.profile$       = this.store.select(getCurProfile);
        this.authors$       = this.store.select(getAuthors);
        this.editors$       = this.store.select(getEditors);
        this.authorsObj$    = this.store.select(getAuthorsObject);
        this.geoLocations$  = this.store.select(getLocations);
        this.cmsChannels$   = this.store.select(getCmsChannels);
        this.cmsCategories$ = this.store.select(getCmsCurChannelCategories);
        this.cmsTopicTypes$ = this.store.select(getCmsCurChannelTopicTypes);
        this.cmsTopics$     = this.store.select(getCmsTopics);
        this.paginator$     = this.store.select(getPaginator(this.etype));
        this.id$            = this.store.select(getCurEntityId(this.etype));
        this.entity$        = this.store.select(getCurEntity(this.etype));
        this.author$        = this.store.select(getCurEntityAuthor(this.etype));
        this.editor$        = this.store.select(getCurEntityEditor(this.etype));
        this.channel$       = this.store.select(getCurEntityChannel(this.etype));
        this.entities$      = this.store.select(getEntitiesCurPage(this.etype));
        this.idsCurPage$    = this.store.select(getIdsCurPage(this.etype));
        this.intro$         = this.store.select(getCurEntityIntro(this.etype));
        this.content$       = this.store.select(getCurEntityContent(this.etype));
        this.keywords$      = this.store.select(getCurEntityKeywordsAsArray(this.etype));
        this.topicType$     = this.store.select(getCurEntityTopicType(this.etype));

        this.images$        = this.store.select(getEntitiesCurPage(ENTITY.ATTACHMENT));
        this.imageIds$      = this.store.select(getIdsCurPage(ENTITY.ATTACHMENT));

        this.subDomain  = this.domain$.subscribe(d => this.domain = d);
        this.subPro     = this.profile$.subscribe(p => this.profile = p);
        this.subEntity  = this.entity$
            .subscribe(e => this.entity = Object.assign({}, e));

        this.subTT = this.cmsTopicTypes$.subscribe(tt => this.cmsTopicTypes = tt);

        // Update the channel in CmsAttrStates with entity channel
        this.subCh      = this.channel$
            .map(ch => ch && ch.id).distinctUntilChanged()
            .subscribe(cid => this.store.dispatch(new CmsAttrActions.SwitchChannel(cid)));

        this.subTopics  = this.cmsTopics$
            .subscribe(topics => this.cmsTopics = topics);

        this.subDirty   = this.dirtyMask$.subscribe(m => this.dirtyMask = m);


        this.subContent = this.content$.subscribe(content => this.content = content);

        // Update content when changed
        this.subCtCtrl = this.contentControl.valueChanges.debounceTime(1000)
            .subscribe(c => {
                if (this.isEditorInitialized) this.update('content', c);
                this.isEditorInitialized = true;
            });

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
        this.subContent.unsubscribe();
        this.subCtCtrl.unsubscribe();
        this.subTT.unsubscribe();
    }

    /**
     * FIXME: Refactor
     */
    canDeactivate() {
        return true;
        /*
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
        */
    }

    /**
     * Kick an action to load the entity when URL changes
     */
    dispatchLoadEntity() {
        this.subParams = this.route.params.distinctUntilChanged()
            .subscribe(params => {
                this.params = params;
                if (this.isNewEntity) {
                    this.store.dispatch(new EntityActions
                        .NewEntity({etype: this.etype, data: this.profile}));
                } else {
                    this.store.dispatch(new EntityActions
                        .LoadEntity({etype: this.etype, data: params['id']}));
                }
                // Reset the flag when we edit new entity
                this.isEditorInitialized = false;
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
    get etypeAttachment() { return ENTITY.ATTACHMENT; }

    /**
     * FIXME: Deprecated! Use tag instead.
     * Set/get a keywords prompt list
     */
    get keywords() {
        if (this.entity) {
            if (this.entity.title_cn)
                return KEYWORDS.map(k => k.replace('[KEY]', this.entity.title_cn));
            else if (this.entity.title)
                return KEYWORDS.map(k => k.replace('[KEY]', this.entity.title));
        } else {
            return ['请先输入标题或锚文本'];
        }
    }

    /**
     * Get featured thumbnail image
     */
    thumbnailUrl(img, isLarge = false) {
        // FIXME: Can we improve ChangeDetection here?
        // console.log("This is called hundreds of times");
        let key = THUMBS.THUMB_AVATAR;
        if (isLarge) key = THUMBS.THUMB_CARD_LG;
        let thumbs = JSON.parse(img.thumbnail)
        if (thumbs && thumbs.hasOwnProperty(key))
            return this.cache.img_server + img.thumb_path + thumbs[key].file;
        else
            return 'http://via.placeholder.com/80x80?text=thumbs';
    }

    /**
     * Get image full url
     * @param uri
     * @returns {string}
     */
    imageUrl(uri: string) {
        // Do add base address to full image address.
        if (uri[0] == 'h' && uri[1] == 't')
            return uri;
        return this.cache.img_server + uri;
    }

    // Search topics from API server
    searchTopic(topicTypeId: number, text: string) {
        this.store.dispatch(
            new CmsAttrActions.SearchTopics({ttid: topicTypeId, text: text}))
        ;
    }

    // Get topics belongs to given topic type
    topicsOfType(ttype: TopicType) {
        if (this.cmsTopics)
            return this.cmsTopics.filter(t => t.type_id === ttype.id);
    }

    /**
     * Attach/detach a relationship to/from an entity, update an attribute
     * of an entity, attach/detach/update string property from entity.
     * There 6 are generic functions that can handle all the modification
     * to any entity.
     */
    toggleAttr(key: string, value: any) {
        if (value.checked) this.detach(key, value);
        else               this.attach(key, value);
    }
    // Attach hasMany attributes
    attach(key: string, value: any) {
        this.store.dispatch(
            new EntityActions.Attach({etype: this.etype, key: key, value: value})
        );
    }
    attachStr(key: string, value: any) {
        this.store.dispatch(
            new EntityActions.Attach({etype: this.etype, key: key, value: value.text})
        );
    }
    // Detach hasMany attributes
    detach(key: string, value: any) {
        this.store.dispatch(
            new EntityActions.Detach({etype: this.etype, key: key, value: value})
        );
    }
    detachStr(key: string, value: any) {
        this.store.dispatch(
            new EntityActions.Detach({etype: this.etype, key: key, value: value.text})
        );
    }

    // Update hasOne/string/single attributes of entity
    update(key: string, value: any) {

        // Save a copy of channel id and dispatch 'channel switch' so we will
        // have category/topic_type availabe for given channel.
        if (key === 'channel_id') {
            this.store.dispatch(new CmsAttrActions.SwitchChannel(value));
        }

        this.updateWithEtype(this.etype, key, value);
    }

    // Update hasOne/string/single attributes of entity of given etype, this
    // enables editing offers with topic page.
    updateWithEtype(etype: string, key: string, value: any) {
        this.store.dispatch(
            new EntityActions.Update({etype: etype, key: key, value: value})
        );
    }

    // Create a new entity
    newEntity() {
        this.newEntityWithEtype(this.etype, this.profile);
    }

    // Create a new entity with given entity type
    newEntityWithEtype(etype: string, user: User) {
        this.store.dispatch(
            new EntityActions.NewEntity({etype: etype, data: user})
        );
    }

    // Delete current entity
    destroy() {
        this.destroyWithEtype(this.etype, this.entity.id);
    }

    // Delete entity given by id and etype, this enables delete offers from
    // topic page.
    destroyWithEtype(etype: string, id: any) {
        this.store.dispatch(
            new EntityActions.DeleteEntity({etype: etype, data: id})
        );
    }

    /**
     * When a image uploaded successfully, we can add it to the head of the
     * image list
     */
    onImageUploaded($event) {
        this.store.dispatch(
            new EntityActions.LoadEntitySuccess(
                {etype: ENTITY.ATTACHMENT, data: $event, prepend: true})
        );
    }

    /**
     * Popup gallery modal and dispatch an action to load images
     */
    showGallery(gallery: any) {
        this.galleryParams = { page: 1 };
        this.store.dispatch(
            new EntityActions.LoadEntitiesOnScroll(
                {etype: ENTITY.ATTACHMENT, data: this.galleryParams}));
        gallery.show();
    }

    /**
     * Load next page images to the popup gallery
     */
    loadMoreImages() {
        this.galleryParams = { page: this.galleryParams.page + 1 };
        this.store.dispatch(
            new EntityActions.LoadEntitiesOnScroll(
                {etype: ENTITY.ATTACHMENT, data: this.galleryParams}));
    }

    /**
     * Add images to the beginning of the content
     */
    insertImage($event) {
        this.froalaModel = $event + this.froalaModel;
        this.update(this.key, this.froalaModel);
    }

    /**
     * Save entity to API server
     */
    save() {
        this.saveWithEtype(this.etype, this.entity, this.dirtyMask);
    }

    /**
     * Save entity to API server with given entity type
     */
    saveWithEtype(etype: string, entity: Entity, mask: string[]) {
        this.store.dispatch(
            new EntityActions.SaveEntity({etype: etype, data: entity, mask: mask}));
    }

    /**
     * Save entity automatically, do not do this for new entity
     */
    autoSave() {
        this.subAS = Observable.interval(30000).subscribe(() => {
            if (this.isDirty && !this.isNewEntity)
                this.store.dispatch(
                    new EntityActions.AutoSave(
                        {etype: this.etype, data: this.entity, mask: this.dirtyMask}));
        });
    }

    cancelSave() {
        this.forceQuit = true;
        this.location.back();
    }

    displayDisplayName(value: any): string {
        return value && typeof value === 'object' ? value.display_name : value;
    }

    displayName(value: any): string {
        return value && typeof value === 'object' ? value.name : value;
    }
}
