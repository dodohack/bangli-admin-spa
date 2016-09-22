import { Action }      from '@ngrx/store';
import { TopicParams } from '../models';
import { Topic }       from '../models';
import { Category }    from "../models";
import { Activity }    from '../models';
import { Post }        from '../models';
import { Tag }         from "../models";

export class DealTopicActions {
    static SEARCH = '[DealTopic] Search';
    static search(query:string):Action {
        return {
            type: DealTopicActions.SEARCH,
            payload: query
        };
    }

    static SEARCH_COMPLETE = '[DealTopic] Search Complete';
    static searchComplete(results: Topic[]):Action {
        return {
            type: DealTopicActions.SEARCH_COMPLETE,
            payload: results
        };
    }

    static LOAD_TOPICS = '[DealTopic] Load Deal Topics';
    static loadTopics(params: TopicParams):Action {
        return {
            type: DealTopicActions.LOAD_TOPICS,
            payload: params
        };
    }

    static LOAD_TOPICS_SUCCESS = '[DealTopic] Load Deal Topics Success';
    static loadTopicsSuccess(topics: Topic[]):Action {
        return {
            type: DealTopicActions.LOAD_TOPICS_SUCCESS,
            payload: topics
        };
    }

    static LOAD_TOPICS_FAIL = '[DealTopic] Load Deal Topics Fail';
    static loadTopicsFail():Action {
        return {
            type: DealTopicActions.LOAD_TOPICS_FAIL
        };
    }

    static BATCH_EDIT_TOPICS = '[DealTopic] Batch Edit Deal Topics';
    static batchEditTopics(ids: number[]): Action {
        return {
            type: DealTopicActions.BATCH_EDIT_TOPICS,
            payload: ids
        };
    }

    static CANCEL_BATCH_EDIT_TOPICS = '[DealTopic] Cancel Batch Edit Deal Topics';
    static cancelBatchEditTopics(): Action {
        return {
            type: DealTopicActions.CANCEL_BATCH_EDIT_TOPICS
        };
    }

    static BATCH_DELETE_TOPICS = '[DealTopic] Batch Delete Deal Topics';
    static batchDeleteTopics(ids: number[]): Action {
        return {
            type: DealTopicActions.BATCH_DELETE_TOPICS,
            payload: ids
        };
    }

    static BATCH_OFFLINE_EDIT_TOPICS = '[DealTopic] Batch Offline Edit Deal Topics';
    static batchOfflineEditTopics(ids: number[]): Action {
        return {
            type: DealTopicActions.BATCH_OFFLINE_EDIT_TOPICS,
            payload: ids
        };
    }

    static BATCH_LOCK_TOPICS = '[DealTopic] Batch Lock Deal Topics';
    static batchLockTopics(ids: number[]): Action {
        return {
            type: DealTopicActions.BATCH_LOCK_TOPICS,
            payload: ids
        };
    }

    static BATCH_EDIT_PREVIOUS_TOPIC = '[Topic] Batch Edit Previous Deal Topic';
    static batchEditPreviousTopic(): Action {
        return {
            type: DealTopicActions.BATCH_EDIT_PREVIOUS_TOPIC
        };
    }

    static BATCH_EDIT_NEXT_TOPIC = '[DealTopic] Batch Edit Next Deal Topic';
    static batchEditNextTopic(): Action {
        return {
            type: DealTopicActions.BATCH_EDIT_NEXT_TOPIC
        };
    }

    static NEW_TOPIC = '[DealTopic] New Deal Topic';
    static newTopic(): Action {
        return {
            type: DealTopicActions.NEW_TOPIC
        };
    }

    static LOAD_TOPIC = '[DealTopic] Load Deal Topic';
    static loadTopic(id:string):Action {
        return {
            type: DealTopicActions.LOAD_TOPIC,
            payload: id
        };
    }

    static LOAD_TOPIC_SUCCESS = '[DealTopic] Load Deal Topic Success';
    static loadTopicSuccess(topic: Topic):Action {
        return {
            type: DealTopicActions.LOAD_TOPIC_SUCCESS,
            payload: topic
        };
    }

    static LOAD_TOPIC_FAIL = '[DealTopic] Load Topic Fail';
    static loadTopicFail():Action {
        return {
            type: DealTopicActions.LOAD_TOPIC_FAIL,
        };
    }

    static AUTO_SAVE = '[DealTopic] Auto Save';
    static autoSave(topic: Topic):Action {
        return {
            type: DealTopicActions.AUTO_SAVE,
            payload: topic
        };
    }

    static SAVE_TOPIC = '[DealTopic] Save Topic';
    static saveTopic(topic: Topic):Action {
        return {
            type: DealTopicActions.SAVE_TOPIC,
            payload: topic
        };
    }

    static APPLY_REVISION = '[DealTopic] Apply Revision';
    static applyRevision(ids: number[]): Action {
        return {
            type: DealTopicActions.APPLY_REVISION,
            payload: ids
        };
    }

    static SAVE_TOPIC_SUCCESS = '[DealTopic] Save Topic Success';
    static saveTopicSuccess(topic: Topic): Action {
        return {
            type: DealTopicActions.SAVE_TOPIC_SUCCESS,
            payload: topic
        };
    }

    static SAVE_TOPIC_FAIL = '[DealTopic] Save Topic Fail';
    static saveTopicFail(): Action {
        return {
            type: DealTopicActions.SAVE_TOPIC_FAIL
        };
    }

    static SAVE_TOPICS = '[DealTopic] Save';
    static saveTopics(topics: Topic[]): Action {
        return {
            type: DealTopicActions.SAVE_TOPICS,
            payload: topics
        };
    }

    static ADD_CATEGORY = '[DealTopic] Add Category';
    static addCategory(cat: Category): Action {
        return {
            type: DealTopicActions.ADD_CATEGORY,
            payload: cat
        };
    }

    static ADD_TAG = '[DealTopic] Add Tag';
    static addTag(tag: Tag): Action {
        return {
            type: DealTopicActions.ADD_TAG,
            payload: tag
        };
    }

    static ADD_POST = '[DealTopic] Add Post';
    static addPost(post: Post): Action {
        return {
            type: DealTopicActions.ADD_POST,
            payload: post
        }
    }

    static REMOVE_CATEGORY = '[DealTopic] Remove Category';
    static removeCategory(cat_id: number): Action {
        return {
            type: DealTopicActions.REMOVE_CATEGORY,
            payload: cat_id
        };
    }

    static REMOVE_TAG = '[DealTopic] Remove Tag';
    static removeTag(tag_id: number): Action {
        return {
            type: DealTopicActions.REMOVE_TAG,
            payload: tag_id
        };
    }

    static REMOVE_POST = '[DealTopic] Remove Post';
    static removePost(post_id: number): Action {
        return {
            type: DealTopicActions.REMOVE_POST,
            payload: post_id
        }
    }

    static REFRESH_ACTIVITY_STATUS = '[DealTopic] Refresh Activity Status';
    static refreshActivityStatus(activities: Activity[]): Action {
        return {
            type: DealTopicActions.REFRESH_ACTIVITY_STATUS,
            payload: activities
        };
    }
}
