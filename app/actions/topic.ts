/**
 * This action is shared by cms->topic, deal->topic
 * We use unified ngrx behavior for those kind of topic because they shares more
 * than 90% of common code base, but with different views.
 * The only thing we need to do is selecting different API for those topics, as
 * we need to separate the storage of them for better management and speed.
 */
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

    static LOAD_TOPICS = '[Topic] Load Topics';
    static loadTopics(filters:any):Action {
        return {
            type: TopicActions.LOAD_TOPICS,
            payload: filters
        };
    }

    static LOAD_TOPICS_SUCCESS = '[Topic] Load Topics Success';
    static loadTopicsSuccess(topics:Topic[]):Action {
        return {
            type: TopicActions.LOAD_TOPICS_SUCCESS,
            payload: topics
        };
    }

    static LOAD_TOPICS_FAIL = '[Topic] Load Topics Fail';
    static loadTopicsFail():Action {
        return {
            type: TopicActions.LOAD_TOPICS_FAIL,
        };
    }

    static BATCH_EDIT_TOPICS = '[Topic] Batch Edit Topics';
    static batchEditTopics(ids: number[]): Action {
        return {
            type: TopicActions.BATCH_EDIT_TOPICS,
            payload: ids
        };
    }

    static CANCEL_BATCH_EDIT_TOPICS = '[Topic] Cancel Batch Edit Topics';
    static cancelBatchEditTopics(): Action {
        return {
            type: TopicActions.CANCEL_BATCH_EDIT_TOPICS
        };
    }

    static BATCH_DELETE_TOPICS = '[Topic] Batch Delete Topics';
    static batchDeleteTopics(ids: number[]): Action {
        return {
            type: TopicActions.BATCH_DELETE_TOPICS,
            payload: ids
        };
    }

    static BATCH_OFFLINE_EDIT_TOPICS = '[Topic] Batch Offline Edit Topics';
    static batchOfflineEditTopics(ids: number[]): Action {
        return {
            type: TopicActions.BATCH_OFFLINE_EDIT_TOPICS,
            payload: ids
        };
    }

    static BATCH_LOCK_TOPICS = '[Topic] Batch Lock Topics';
    static batchLockTopics(ids: number[]): Action {
        return {
            type: TopicActions.BATCH_LOCK_TOPICS,
            payload: ids
        };
    }

    static BATCH_EDIT_PREVIOUS_TOPIC = '[Topic] Batch Edit Previous Topic';
    static batchEditPreviousTopic(): Action {
        return {
            type: TopicActions.BATCH_EDIT_PREVIOUS_TOPIC
        };
    }

    static BATCH_EDIT_NEXT_TOPIC = '[Topic] Batch Edit Next Topic';
    static batchEditNextTopic(): Action {
        return {
            type: TopicActions.BATCH_EDIT_NEXT_TOPIC
        };
    }

    static NEW_TOPIC = '[Topic] New Topic';
    static newTopic(): Action {
        return {
            type: TopicActions.NEW_TOPIC
        };
    }

    static LOAD_TOPIC = '[Topic] Load Topic';
    static loadTopic(id:string):Action {
        return {
            type: TopicActions.LOAD_TOPIC,
            payload: id
        };
    }

    static LOAD_TOPIC_SUCCESS = '[Topic] Load Topic Success';
    static loadTopicSuccess(topic:Topic):Action {
        return {
            type: TopicActions.LOAD_TOPIC_SUCCESS,
            payload: topic
        };
    }

    static LOAD_TOPIC_FAIL = '[Topic] Load Topic Fail';
    static loadTopicFail():Action {
        return {
            type: TopicActions.LOAD_TOPIC_FAIL,
        };
    }

    static AUTO_SAVE = '[Topic] Auto Save';
    static autoSave(topic:Topic):Action {
        return {
            type: TopicActions.AUTO_SAVE,
            payload: topic
        };
    }

    static SAVE_TOPIC = '[Topic] Save Topic';
    static saveTopic(topic:Topic):Action {
        return {
            type: TopicActions.SAVE_TOPIC,
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

    static SAVE_TOPIC_SUCCESS = '[Topic] Save Topic Success';
    static saveTopicSuccess(topic: Topic): Action {
        return {
            type: TopicActions.SAVE_TOPIC_SUCCESS,
            payload: topic
        };
    }

    static SAVE_TOPIC_FAIL = '[Topic] Save Topic Fail';
    static saveTopicFail(): Action {
        return {
            type: TopicActions.SAVE_TOPIC_FAIL
        };
    }

    static SAVE_TOPICS = '[Topic] Save Topics';
    static saveTopics(topics: Topic[]): Action {
        return {
            type: TopicActions.SAVE_TOPICS,
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
