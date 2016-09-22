/**
 * This action is shared by almost everything, includes product, order, voucher,
 * cms->post, deal->post, page, newsletter, etc.
 * We use centralized ngrx behavior for those entities because they shares more
 * than 90% of common code base, but with different view templates.
 * The only thing we need to do is selecting different API for those entities, as
 * we need to separate their database tables in order to get better management
 * and speed.
 */
import { Action }       from '@ngrx/store';
import { EntityParams } from '../models';
import { Category }   from "../models";
import { Tag }        from "../models";
import { Topic }      from "../models";
import { Activity }   from '../models';

/**
 * Template type 'T' can be Topic, Post, Product, Order etc.
 * We apply
 */
export class EntityActions {
    static SEARCH = '[Entity] Search';
    static search(params: EntityParams): Action {
        return {
            type: EntityActions.SEARCH,
            payload: params
        };
    }

    static SEARCH_COMPLETE = '[Entity] Search Complete';
    static searchComplete<T>(results: T[]): Action {
        return {
            type: EntityActions.SEARCH_COMPLETE,
            payload: results
        };
    }

    static LOAD_ENTITIES = '[Entity] Load Entities';
    static loadEntities(params: EntityParams): Action {
        return {
            type: EntityActions.LOAD_ENTITIES,
            payload: params
        };
    }

    static LOAD_ENTITIES_SUCCESS = '[Entity] Load Entities Success';
    static loadEntitiesSuccess<T>(entities: T[]): Action {
        return {
            type: EntityActions.LOAD_ENTITIES_SUCCESS,
            payload: entities
        };
    }

    static LOAD_ENTITIES_FAIL = '[Entity] Load Entities Fail';
    static loadEntitiesFail(): Action {
        return {
            type: EntityActions.LOAD_ENTITIES_FAIL,
        };
    }

    static BATCH_EDIT_ENTITIES = '[Entity] Batch Edit Entities';
    static batchEditEntities(ids: number[]): Action {
        return {
            type: EntityActions.BATCH_EDIT_ENTITIES,
            payload: ids
        };
    }

    static CANCEL_BATCH_EDIT_ENTITIES = '[Entity] Cancel Batch Edit Entities';
    static cancelBatchEditEntities(): Action {
        return {
            type: EntityActions.CANCEL_BATCH_EDIT_ENTITIES
        };
    }
    
    static BATCH_DELETE_ENTITIES = '[Entity] Batch Delete Entities';
    static batchDeleteEntities(ids: number[]): Action {
        return {
            type: EntityActions.BATCH_DELETE_ENTITIES,
            payload: ids
        };
    }
    
    static BATCH_OFFLINE_EDIT_ENTITIES = '[Entity] Batch Offline Edit Entities';
    static batchOfflineEditEntities(ids: number[]): Action {
        return {
            type: EntityActions.BATCH_OFFLINE_EDIT_ENTITIES,
            payload: ids
        };
    }

    static BATCH_LOCK_ENTITIES = '[Entity] Batch Lock Entities';
    static batchLockEntities(ids: number[]): Action {
        return {
            type: EntityActions.BATCH_LOCK_ENTITIES,
            payload: ids
        };
    }

    static BATCH_EDIT_PREVIOUS_ENTITY = '[Entity] Batch Edit Previous Entity';
    static batchEditPreviousEntity(): Action {
        return {
            type: EntityActions.BATCH_EDIT_PREVIOUS_ENTITY
        };
    }

    static BATCH_EDIT_NEXT_ENTITY = '[Entity] Batch Edit Next Entity';
    static batchEditNextEntity(): Action {
        return {
            type: EntityActions.BATCH_EDIT_NEXT_ENTITY
        };
    }

    static NEW_ENTITY = '[Entity] New Entity';
    static newEntity(): Action {
        return {
            type: EntityActions.NEW_ENTITY
        };
    }

    static LOAD_ENTITY = '[Entity] Load Entity';
    static loadEntity(id: number): Action {
        return {
            type: EntityActions.LOAD_ENTITY,
            payload: id
        };
    }

    static LOAD_ENTITY_SUCCESS = '[Entity] Load Entity Success';
    static loadEntitiesuccess<T>(entity: T): Action {
        return {
            type: EntityActions.LOAD_ENTITY_SUCCESS,
            payload: entity
        };
    }

    static LOAD_ENTITY_FAIL = '[Entity] Load Entity Fail';
    static loadEntityFail(): Action {
        return {
            type: EntityActions.LOAD_ENTITY_FAIL,
        };
    }

    static AUTO_SAVE = '[Entity] Auto Save';
    static autoSave<T>(entity: T): Action {
        return {
            type: EntityActions.AUTO_SAVE,
            payload: entity
        };
    }

    static SAVE_ENTITY = '[Entity] Save Entity';
    static saveEntity<T>(entity: T): Action {
        return {
            type: EntityActions.SAVE_ENTITY,
            payload: entity
        };
    }

    static APPLY_REVISION = '[Entity] Apply Revision';
    static applyRevision(ids: number[]): Action {
        return {
            type: EntityActions.APPLY_REVISION,
            payload: ids
        };
    }
    
    static SAVE_ENTITY_SUCCESS = '[Entity] Save Entity Success';
    static saveEntitySuccess<T>(entity: T): Action {
        return {
            type: EntityActions.SAVE_ENTITY_SUCCESS,
            payload: entity
        };
    }

    static SAVE_ENTITY_FAIL = '[Entity] Save Entity Fail';
    static saveEntityFail(): Action {
        return {
            type: EntityActions.SAVE_ENTITY_FAIL
        };
    }

    static SAVE_ENTITIES = '[Entity] Save Entities';
    static saveEntities<T>(entities: T[]): Action {
        return {
            type: EntityActions.SAVE_ENTITIES,
            payload: entities
        };
    }

    static ADD_CATEGORY = '[Entity] Add Category';
    static addCategory(cat: Category): Action {
        return {
            type: EntityActions.ADD_CATEGORY,
            payload: cat
        };
    }

    static ADD_TAG = '[Entity] Add Tag';
    static addTag(tag: Tag): Action {
        return {
            type: EntityActions.ADD_TAG,
            payload: tag
        };
    }

    static ADD_TOPIC = '[Entity] Add Topic';
    static addTopic(topic: Topic): Action {
        return {
            type: EntityActions.ADD_TOPIC,
            payload: topic
        }
    }
    
    static REMOVE_CATEGORY = '[Entity] Remove Category';
    static removeCategory(cat_id: number): Action {
        return {
            type: EntityActions.REMOVE_CATEGORY,
            payload: cat_id
        };
    }

    static REMOVE_TAG = '[Entity] Remove Tag';
    static removeTag(tag_id: number): Action {
        return {
            type: EntityActions.REMOVE_TAG,
            payload: tag_id
        };
    }

    static REMOVE_TOPIC = '[Entity] Remove Topic';
    static removeTopic(topic_id: number): Action {
        return {
            type: EntityActions.REMOVE_TOPIC,
            payload: topic_id
        }
    }
    
    static REFRESH_ACTIVITY_STATUS = '[Entity] Refresh Activity Status';
    static refreshActivityStatus(activities: Activity[]): Action {
        return {
            type: EntityActions.REFRESH_ACTIVITY_STATUS,
            payload: activities
        };
    }
}