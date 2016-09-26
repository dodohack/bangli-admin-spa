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
import { Entity }       from '../models';
import { Category }     from "../models";
import { Tag }          from "../models";
import { Topic }        from "../models";
import { Activity }     from '../models';

/**
 * Template type 'T' can be Topic, Post, Product, Order etc.
 * We apply
 */
export class EntityActions {
    static SEARCH = '[Entity] Search';
    static search(etype: string, params: EntityParams): Action {
        return {
            type: EntityActions.SEARCH,
            payload: {etype: etype, data: params}
        };
    }

    static SEARCH_COMPLETE = '[Entity] Search Complete';
    static searchComplete(etype: string, results: Entity[]): Action {
        return {
            type: EntityActions.SEARCH_COMPLETE,
            payload: {etype: etype, data: results}
        };
    }

    static LOAD_ENTITIES = '[Entity] Load Entities';
    static loadEntities(etype: string, params: EntityParams): Action {
        return {
            type: EntityActions.LOAD_ENTITIES,
            payload: {etype: etype, data: params}
        };
    }

    static LOAD_ENTITIES_SUCCESS = '[Entity] Load Entities Success';
    static loadEntitiesSuccess(etype: string, results: any): Action {
        return {
            type: EntityActions.LOAD_ENTITIES_SUCCESS,
            payload: {etype: etype, data: results}
        };
    }

    static LOAD_ENTITIES_FAIL = '[Entity] Load Entities Fail';
    static loadEntitiesFail(/*etype: string*/): Action {
        return {
            type: EntityActions.LOAD_ENTITIES_FAIL/*,
            payload: {etype: etype}*/
        };
    }
    
    static LOAD_ENTITIES_ON_SCROLL = '[Entity] Load Entities On Scroll';
    static loadEntitiesOnScroll(etype: string, params: EntityParams): Action {
        return {
            type: EntityActions.LOAD_ENTITIES_ON_SCROLL,
            payload: {etype: etype, data: params}
        };
    }

    static LOAD_ENTITIES_ON_SCROLL_SUCCESS = '[Entity] Load Entities On Scroll Success';
    static loadEntitiesOnScrollSuccess(etype: string, results: any): Action {
        return {
            type: EntityActions.LOAD_ENTITIES_ON_SCROLL_SUCCESS,
            payload: {etype: etype, data: results}
        };
    }

    static LOAD_ENTITIES_ON_SCROLL_FAIL = '[Entity] Load Entities On Scroll Fail';
    static loadEntitiesOnScrollFail(/*etype: string*/): Action {
        return {
            type: EntityActions.LOAD_ENTITIES_ON_SCROLL_FAIL/*,
             payload: {etype: etype}*/
        };
    }    

    static BATCH_EDIT_ENTITIES = '[Entity] Batch Edit Entities';
    static batchEditEntities(etype: string, ids: number[]): Action {
        return {
            type: EntityActions.BATCH_EDIT_ENTITIES,
            payload: {etype: etype, data: ids}
        };
    }

    static CANCEL_BATCH_EDIT_ENTITIES = '[Entity] Cancel Batch Edit Entities';
    static cancelBatchEditEntities(etype: string): Action {
        return {
            type: EntityActions.CANCEL_BATCH_EDIT_ENTITIES,
            payload: {etype: etype}
        };
    }
    
    static BATCH_DELETE_ENTITIES = '[Entity] Batch Delete Entities';
    static batchDeleteEntities(etype: string, ids: number[]): Action {
        return {
            type: EntityActions.BATCH_DELETE_ENTITIES,
            payload: {etype: etype, data: ids}
        };
    }
    
    static BATCH_OFFLINE_EDIT_ENTITIES = '[Entity] Batch Offline Edit Entities';
    static batchOfflineEditEntities(etype: string, ids: number[]): Action {
        return {
            type: EntityActions.BATCH_OFFLINE_EDIT_ENTITIES,
            payload: {etype: etype, data: ids}
        };
    }

    static BATCH_LOCK_ENTITIES = '[Entity] Batch Lock Entities';
    static batchLockEntities(etype: string, ids: number[]): Action {
        return {
            type: EntityActions.BATCH_LOCK_ENTITIES,
            payload: {etype: etype, data: ids}
        };
    }

    static BATCH_EDIT_PREVIOUS_ENTITY = '[Entity] Batch Edit Previous Entity';
    static batchEditPreviousEntity(etype: string): Action {
        return {
            type: EntityActions.BATCH_EDIT_PREVIOUS_ENTITY,
            payload: {etype: etype}
        };
    }

    static BATCH_EDIT_NEXT_ENTITY = '[Entity] Batch Edit Next Entity';
    static batchEditNextEntity(etype: string): Action {
        return {
            type: EntityActions.BATCH_EDIT_NEXT_ENTITY,
            payload: {etype: etype}
        };
    }

    static NEW_ENTITY = '[Entity] New Entity';
    static newEntity(etype: string): Action {
        return {
            type: EntityActions.NEW_ENTITY,
            payload: {etype: etype}
        };
    }

    static LOAD_ENTITY = '[Entity] Load Entity';
    static loadEntity(etype: string, id: string): Action {
        return {
            type: EntityActions.LOAD_ENTITY,
            payload: {etype: etype, data: id}
        };
    }

    static LOAD_ENTITY_SUCCESS = '[Entity] Load Entity Success';
    static loadEntitySuccess(etype: string, entity: Entity): Action {
        return {
            type: EntityActions.LOAD_ENTITY_SUCCESS,
            payload: {etype: etype, data: entity}
        };
    }

    static LOAD_ENTITY_FAIL = '[Entity] Load Entity Fail';
    static loadEntityFail(/*etype: string*/): Action {
        return {
            type: EntityActions.LOAD_ENTITY_FAIL/*,
            payload: {etype: etype}*/
        };
    }

    static AUTO_SAVE = '[Entity] Auto Save';
    static autoSave(etype: string, entity: Entity): Action {
        return {
            type: EntityActions.AUTO_SAVE,
            payload: {etype: etype, data: entity}
        };
    }

    static SAVE_ENTITY = '[Entity] Save Entity';
    static saveEntity(etype: string, entity: Entity): Action {
        return {
            type: EntityActions.SAVE_ENTITY,
            payload: {etype: etype, data: entity}
        };
    }

    static APPLY_REVISION = '[Entity] Apply Revision';
    static applyRevision(etype: string, ids: number[]): Action {
        return {
            type: EntityActions.APPLY_REVISION,
            payload: {etype: etype, data: ids}
        };
    }
    
    static SAVE_ENTITY_SUCCESS = '[Entity] Save Entity Success';
    static saveEntitySuccess(etype: string, entity: Entity): Action {
        return {
            type: EntityActions.SAVE_ENTITY_SUCCESS,
            payload: {etype: etype, data: entity}
        };
    }

    static SAVE_ENTITY_FAIL = '[Entity] Save Entity Fail';
    static saveEntityFail(/*etype: string*/): Action {
        return {
            type: EntityActions.SAVE_ENTITY_FAIL/*,
            payload: {etype: etype}*/
        };
    }

    static SAVE_ENTITIES = '[Entity] Save Entities';
    static saveEntities(etype: string, entities: Entity[]): Action {
        return {
            type: EntityActions.SAVE_ENTITIES,
            payload: {etype: etype, data: entities}
        };
    }

    static ADD_CATEGORY = '[Entity] Add Category';
    static addCategory(etype: string, cat: Category): Action {
        return {
            type: EntityActions.ADD_CATEGORY,
            payload: {etype: etype, data: cat}
        };
    }

    static ADD_TAG = '[Entity] Add Tag';
    static addTag(etype: string, tag: Tag): Action {
        return {
            type: EntityActions.ADD_TAG,
            payload: {etype: etype, data: tag}
        };
    }

    // FIXME: Should we merge ATTACH_TOPIC_TO_ENTITY and
    // ATTACH_ENTITY_TO_TOPIC into single ATTACH_ENTITY_TO_ENTITY??
    static ATTACH_TOPIC_TO_ENTITY = '[Entity] Attach Topic To Entity';
    static attachTopicToEntity(etype: string, topic: Topic): Action {
        return {
            type: EntityActions.ATTACH_TOPIC_TO_ENTITY,
            payload: {etype: etype, data: topic}
        }
    }

    static ATTACH_ENTITY_TO_TOPIC = '[Entity] Add Entity To Topic';
    static attachEntityToTopic(etype: string, entity: Entity): Action {
        return {
            type: EntityActions.ATTACH_ENTITY_TO_TOPIC,
            payload: {etype: etype, data: entity}
        }
    }

    static REMOVE_CATEGORY = '[Entity] Remove Category';
    static removeCategory(etype: string, cat_id: number): Action {
        return {
            type: EntityActions.REMOVE_CATEGORY,
            payload: {etype: etype, data: cat_id}
        };
    }

    static REMOVE_TAG = '[Entity] Remove Tag';
    static removeTag(etype: string, tag_id: number): Action {
        return {
            type: EntityActions.REMOVE_TAG,
            payload: {etype: etype, data: tag_id}
        };
    }

    static DETACH_TOPIC_FROM_ENTITY = '[Entity] Detach Topic From Entity';
    static detachTopicFromEntity(etype: string, topic_id: number): Action {
        return {
            type: EntityActions.DETACH_TOPIC_FROM_ENTITY,
            payload: {etype: etype, data: topic_id}
        }
    }

    static DETACH_ENTITY_FROM_TOPIC = '[Entity] Detach Entity From Topic';
    static detachEntityFromTopic(etype: string, entity_id: number): Action {
        return {
            type: EntityActions.DETACH_ENTITY_FROM_TOPIC,
            payload: {etype: etype, data: entity_id}
        }
    }
    
    static REFRESH_ACTIVITY_STATUS = '[Entity] Refresh Activity Status';
    static refreshActivityStatus(etype: string, activities: Activity[]): Action {
        return {
            type: EntityActions.REFRESH_ACTIVITY_STATUS,
            payload: {etype: etype, data: activities}
        };
    }
}