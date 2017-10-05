/**
 * This action is shared by almost everything, includes product, order, voucher,
 * cms->post, offer->post, page, newsletter, etc.
 * We use centralized ngrx behavior for those entities because they shares more
 * than 90% of common code base, but with different view templates.
 * The only thing we need to do is selecting different API for those entities, as
 * we need to separate their database tables in order to get better management
 * and speed.
 */
import { Action }       from '@ngrx/store';
import { EntityParams } from '../models';
import { Entity }       from '../models';
import { User }         from '../models';
import { GeoLocation }  from "../models";
import { Category }     from "../models";
import { Tag }          from "../models";
import { Topic }        from "../models";
import { Activity }     from '../models';

export const SEARCH = '[Entity] Search';
export const SEARCH_COMPLETE = '[Entity] Search Complete';
export const LOAD_ENTITIES = '[Entity] Load Entities';
export const LOAD_ENTITIES_SUCCESS = '[Entity] Load Entities Success';
export const LOAD_ENTITIES_FAIL = '[Entity] Load Entities Fail';
export const LOAD_ENTITIES_ON_SCROLL = '[Entity] Load Entities On Scroll';
export const LOAD_ENTITIES_ON_SCROLL_SUCCESS = '[Entity] Load Entities On Scroll Success';
export const LOAD_ENTITIES_ON_SCROLL_FAIL = '[Entity] Load Entities On Scroll Fail';
export const BATCH_EDIT_ENTITIES = '[Entity] Batch Edit Entities';
export const CANCEL_BATCH_EDIT_ENTITIES = '[Entity] Cancel Batch Edit Entities';
export const BATCH_DELETE_ENTITIES = '[Entity] Batch Delete Entities';
export const BATCH_OFFLINE_EDIT_ENTITIES = '[Entity] Batch Offline Edit Entities';
export const BATCH_LOCK_ENTITIES = '[Entity] Batch Lock Entities';
export const BATCH_EDIT_PREVIOUS_ENTITY = '[Entity] Batch Edit Previous Entity';
export const BATCH_EDIT_NEXT_ENTITY = '[Entity] Batch Edit Next Entity';
export const NEW_ENTITY = '[Entity] New Entity';
export const LOAD_ENTITY = '[Entity] Load Entity';
export const LOAD_ENTITY_SUCCESS = '[Entity] Load Entity Success';
export const LOAD_ENTITY_FAIL = '[Entity] Load Entity Fail';
export const AUTO_SAVE = '[Entity] Auto Save';
export const SAVE_ENTITY = '[Entity] Save Entity';
export const SAVE_ENTITY_SUCCESS = '[Entity] Save Entity Success';
export const AUTO_SAVE_SUCCESS = '[Entity] Auto Save Success';
export const SAVE_ENTITY_FAIL = '[Entity] Save Entity Fail';
export const SAVE_ENTITIES = '[Entity] Save Entities';
export const ATTACH = '[Entity] Attach Relationship';
export const DETACH = '[Entity] Detach Relationship';
export const UPDATE = '[Entity] Update Attribute';
export const UPDATE_MANY = '[Entity] Update Relationships';
export const REFRESH_ACTIVITY_STATUS = '[Entity] Refresh Activity Status';
export const GENERATE_THUMBS = '[Attachment] Generate thumbs';

export class Search implements Action {
    readonly type = SEARCH;
    constructor(public payload: {etype: string, data: EntityParams}) {}
}

export class SearchComplete implements Action {
    readonly type = SEARCH_COMPLETE;
    constructor(public payload: {etype: string, data: Entity[]}) {}
}

export class LoadEntities implements Action {
    readonly type = LOAD_ENTITIES;
    constructor(public payload: {etype: string, data: EntityParams}) {}
}

export class LoadEntitiesSuccess implements Action {
    readonly type = LOAD_ENTITIES_SUCCESS;
    constructor(public payload: {etype: string, data: any}) {}
}

export class LoadEntitiesFail implements Action {
    readonly type = LOAD_ENTITIES_FAIL;
}

export class LoadEntitiesOnScroll implements Action {
    readonly type = LOAD_ENTITIES_ON_SCROLL;
    constructor(public payload: {etype: string, data: EntityParams}) {}
}

export class LoadEntitiesOnScrollSuccess implements Action {
    readonly type = LOAD_ENTITIES_ON_SCROLL_SUCCESS;
    constructor(public payload: {etype: string, data: any}) {}
}

export class LoadEntitiesOnScrollFail implements Action {
    readonly type = LOAD_ENTITIES_ON_SCROLL_FAIL;
}

export class BatchEditEntities implements Action {
    readonly type = BATCH_EDIT_ENTITIES;
    // Payload - entities' ids
    constructor(public payload: {etype: string, data: number[]}) {}
}

export class CancelBatchEditEntities implements Action {
    readonly type = CANCEL_BATCH_EDIT_ENTITIES;
    constructor(public payload: {etype: string}) {}
}

export class BatchDeleteEntities implements Action {
    readonly type = BATCH_DELETE_ENTITIES;
    // Payload - entities' ids
    constructor(public payload: {etype: string, data: number[]}) {}
}

// DEPRECATED
export class BatchOfflineEditEntities implements Action {
    readonly type = BATCH_OFFLINE_EDIT_ENTITIES;
    constructor(public payload: {etype: string, data: number[]}) {}
}

export class BatchLockEntities implements Action {
    readonly type = BATCH_LOCK_ENTITIES;
    constructor(public payload: {etype: string, data: number[]}) {}
}

export class BatchEditPreviousEntity implements Action {
    readonly type = BATCH_EDIT_PREVIOUS_ENTITY;
    constructor(public payload: {etype: string}) {}
}

export class BatchEditNextEntity implements Action {
    readonly type = BATCH_EDIT_NEXT_ENTITY;
    constructor(public payload: {etype: string}) {}
}

export class NewEntity implements Action {
    readonly type = NEW_ENTITY;
    // Payload.data: author
    constructor(public payload: {etype: string, data: User}) {}
}

export class LoadEntity implements Action {
    readonly type = LOAD_ENTITY;
    // Payload: entity type, entity id
    constructor(public payload: {etype: string, data: string}) {}
}

/*
 * A entity is returned from server, if prepend is true, it is added
 * to the head of entity list. (for image and newly created entity)
 */
export class LoadEntitySuccess implements Action {
    readonly type = LOAD_ENTITY_SUCCESS;
    constructor(public payload: {etype: string, data: Entity,
        prepend: boolean }) {}
}

export class LoadEntityFail implements Action {
    readonly type = LOAD_ENTITY_FAIL;
}

export class AutoSave implements Action {
    readonly type = AUTO_SAVE;
    // Auto save modified entries(marked by mask) of an entity,
    constructor(public payload: {etype: string, data: Entity, mask: string[]}) {}
}

export class SaveEntity implements Action {
    readonly type = SAVE_ENTITY;
    constructor(public payload: {etype: string, data: Entity, mask: string[]}) {}
}

export class SaveEntitySuccess implements Action {
    readonly type = SAVE_ENTITY_SUCCESS;
    constructor(public payload: {etype: string, data: Entity}) {}
}

export class AutoSaveSuccess implements Action {
    readonly type = AUTO_SAVE_SUCCESS;
    constructor(public payload: {etype: string, data: Entity}) {}
}

export class SaveEntityFail implements Action {
    readonly type = SAVE_ENTITY_FAIL;
}

export class SaveEntities implements Action {
    readonly type = SAVE_ENTITIES;
    constructor(public payload: {etype: string, data: Entity[]}) {}
}

/**
 * Attach relationship specified in value to the entity, indexed by
 * key - entity attributes
 */
export class Attach implements Action {
    readonly type = ATTACH;
    constructor(public payload: {etype: string, key: string, value: any}) {}
}

/**
 * Detach a relationship from the entity matches given value, indexed by
 * key - entity attributes
 */
export class Detach implements Action {
    readonly type = DETACH;
    constructor(public payload: {etype: string, key: string, value: any}) {}
}

/**
 * Update entity attribute or has-one relationship(relationship not in array)
 */
export class Update implements Action {
    readonly type = UPDATE;
    constructor(public payload: {etype: string, key: string, value: any}) {}
}

/**
 * Update entity has-many relationship(relationship in array)
 */
export class UpdateMany implements Action {
    readonly type = UPDATE_MANY;
    constructor(public payload: {etype: string, key: string,
        idx: number, value: any}) {}
}

export class RefreshActivityStatus implements Action {
    readonly type = REFRESH_ACTIVITY_STATUS;
    constructor(public payload: {etype: string, data: Activity[]}) {}
}

/**
 * Attachment only
 */
export class GenerateThumbs implements Action {
    readonly type = GENERATE_THUMBS;
    constructor(public payload: {etype: string}) {}
}

export type Actions = Search
| SearchComplete
| LoadEntities
| LoadEntitiesSuccess
| LoadEntitiesFail
| LoadEntitiesOnScroll
| LoadEntitiesOnScrollSuccess
| LoadEntitiesOnScrollFail
| BatchEditEntities
| CancelBatchEditEntities
| BatchDeleteEntities
| BatchOfflineEditEntities
| BatchLockEntities
| BatchEditPreviousEntity
| BatchEditNextEntity
| NewEntity
| LoadEntity
| LoadEntitySuccess
| LoadEntityFail
| AutoSave
| SaveEntity
| SaveEntitySuccess
| AutoSaveSuccess
| SaveEntityFail
| SaveEntities
| Attach
| Detach
| Update
| UpdateMany
| RefreshActivityStatus
| GenerateThumbs;

