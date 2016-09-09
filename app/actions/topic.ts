import { Action }      from '@ngrx/store';
import { TopicParams } from '../models';
import { Topic }       from '../models';
import { Category }    from "../models";
import { Activity }    from '../models';
import { Post }        from '../models';
import { Tag }         from "../models";

export class TopicActions {
    static SEARCH = '[Topic] Search';
    static search(query:string):Action {
        return {
            type: TopicActions.SEARCH,
            payload: query
        };
    }

    static SEARCH_COMPLETE = '[Topic] Search Complete';
    static searchComplete(results:Topic[]):Action {
        return {
            type: TopicActions.SEARCH_COMPLETE,
            payload: results
        };
    }

    static LOAD_ENTITIES = '[Topic] Load Topics';
    static loadTopics(filters:any):Action {
        return {
            type: TopicActions.LOAD_ENTITIES,
            payload: filters
        };
    }

    static LOAD_ENTITIES_SUCCESS = '[Topic] Load Topics Success';
    static loadTopicsSuccess(topics:Topic[]):Action {
        return {
            type: TopicActions.LOAD_ENTITIES_SUCCESS,
            payload: topics
        };
    }

    static LOAD_ENTITIES_FAIL = '[Topic] Load Topics Fail';
    static loadTopicsFail():Action {
        return {
            type: TopicActions.LOAD_ENTITIES_FAIL,
        };
    }

    static BATCH_EDIT_ENTITIES = '[Topic] Batch Edit Topics';
    static batchEditTopics(ids: number[]): Action {
        return {
            type: TopicActions.BATCH_EDIT_ENTITIES,
            payload: ids
        };
    }

    static CANCEL_BATCH_EDIT_ENTITIES = '[Topic] Cancel Batch Edit Topics';
    static cancelBatchEditTopics(): Action {
        return {
            type: TopicActions.CANCEL_BATCH_EDIT_ENTITIES
        };
    }

    static BATCH_DELETE_ENTITIES = '[Topic] Batch Delete Topics';
    static batchDeleteTopics(ids: number[]): Action {
        return {
            type: TopicActions.BATCH_DELETE_ENTITIES,
            payload: ids
        };
    }

    static BATCH_OFFLINE_EDIT_ENTITIES = '[Topic] Batch Offline Edit Topics';
    static batchOfflineEditTopics(ids: number[]): Action {
        return {
            type: TopicActions.BATCH_OFFLINE_EDIT_ENTITIES,
            payload: ids
        };
    }

    static BATCH_LOCK_ENTITIES = '[Topic] Batch Lock Topics';
    static batchLockTopics(ids: number[]): Action {
        return {
            type: TopicActions.BATCH_LOCK_ENTITIES,
            payload: ids
        };
    }

    static BATCH_EDIT_PREVIOUS_ENTITY = '[Topic] Batch Edit Previous Topic';
    static batchEditPreviousTopic(): Action {
        return {
            type: TopicActions.BATCH_EDIT_PREVIOUS_ENTITY
        };
    }

    static BATCH_EDIT_NEXT_ENTITY = '[Topic] Batch Edit Next Topic';
    static batchEditNextTopic(): Action {
        return {
            type: TopicActions.BATCH_EDIT_NEXT_ENTITY
        };
    }

    static NEW_ENTITY = '[Topic] New Topic';
    static newTopic(): Action {
        return {
            type: TopicActions.NEW_ENTITY
        };
    }

    static LOAD_ENTITY = '[Topic] Load Topic';
    static loadTopic(id:string):Action {
        return {
            type: TopicActions.LOAD_ENTITY,
            payload: id
        };
    }

    static LOAD_ENTITY_SUCCESS = '[Topic] Load Topic Success';
    static loadTopicSuccess(topic:Topic):Action {
        return {
            type: TopicActions.LOAD_ENTITY_SUCCESS,
            payload: topic
        };
    }

    static LOAD_ENTITY_FAIL = '[Topic] Load Topic Fail';
    static loadTopicFail():Action {
        return {
            type: TopicActions.LOAD_ENTITY_FAIL,
        };
    }

    static AUTO_SAVE = '[Topic] Auto Save';
    static autoSave(topic:Topic):Action {
        return {
            type: TopicActions.AUTO_SAVE,
            payload: topic
        };
    }

    static SAVE_ENTITY = '[Topic] Save Topic';
    static saveTopic(topic:Topic):Action {
        return {
            type: TopicActions.SAVE_ENTITY,
            payload: topic
        };
    }

    static APPLY_REVISION = '[Topic] Apply Revision';
    static applyRevision(ids: number[]): Action {
        return {
            type: TopicActions.APPLY_REVISION,
            payload: ids
        };
    }

    static SAVE_ENTITY_SUCCESS = '[Topic] Save Topic Success';
    static saveTopicSuccess(topic: Topic): Action {
        return {
            type: TopicActions.SAVE_ENTITY_SUCCESS,
            payload: topic
        };
    }

    static SAVE_ENTITY_FAIL = '[Topic] Save Topic Fail';
    static saveTopicFail(): Action {
        return {
            type: TopicActions.SAVE_ENTITY_FAIL
        };
    }

    static SAVE_ENTITIES = '[Topic] Save Topics';
    static saveTopics(topics: Topic[]): Action {
        return {
            type: TopicActions.SAVE_ENTITIES,
            payload: topics
        };
    }

    static ADD_CATEGORY = '[Topic] Add Category';
    static addCategory(cat: Category): Action {
        return {
            type: TopicActions.ADD_CATEGORY,
            payload: cat
        };
    }

    static ADD_TAG = '[Topic] Add Tag';
    static addTag(tag: Tag): Action {
        return {
            type: TopicActions.ADD_TAG,
            payload: tag
        };
    }

    static ADD_POST = '[Topic] Add Post';
    static addPost(post: Post): Action {
        return {
            type: TopicActions.ADD_POST,
            payload: post
        }
    }

    static REMOVE_CATEGORY = '[Topic] Remove Category';
    static removeCategory(cat_id: number): Action {
        return {
            type: TopicActions.REMOVE_CATEGORY,
            payload: cat_id
        };
    }

    static REMOVE_TAG = '[Topic] Remove Tag';
    static removeTag(tag_id: number): Action {
        return {
            type: TopicActions.REMOVE_TAG,
            payload: tag_id
        };
    }

    static REMOVE_POST = '[Topic] Remove Post';
    static removePost(post_id: number): Action {
        return {
            type: TopicActions.REMOVE_POST,
            payload: post_id
        }
    }

    static REFRESH_ACTIVITY_STATUS = '[Topic] Refresh Activity Status';
    static refreshActivityStatus(activities: Activity[]): Action {
        return {
            type: TopicActions.REFRESH_ACTIVITY_STATUS,
            payload: activities
        };
    }
}
