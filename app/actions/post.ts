import { Action }     from '@ngrx/store';
import { PostParams } from '../models';
import { Post }       from '../models';
import { Category }   from "../models";
import { Tag }        from "../models";
import { Topic }      from "../models";
import { Activity }   from '../models';

export class PostActions {
    static SEARCH = '[Post] Search';
    static search(params: PostParams): Action {
        return {
            type: PostActions.SEARCH,
            payload: params
        };
    }

    static SEARCH_COMPLETE = '[Post] Search Complete';
    static searchComplete(results: Post[]): Action {
        return {
            type: PostActions.SEARCH_COMPLETE,
            payload: results
        };
    }

    static LOAD_ENTITIES = '[Post] Load Posts';
    static loadPosts(params: PostParams): Action {
        return {
            type: PostActions.LOAD_ENTITIES,
            payload: params
        };
    }

    static LOAD_ENTITIES_SUCCESS = '[Post] Load Posts Success';
    static loadPostsSuccess(posts: Post[]): Action {
        return {
            type: PostActions.LOAD_ENTITIES_SUCCESS,
            payload: posts
        };
    }

    static LOAD_ENTITIES_FAIL = '[Post] Load Posts Fail';
    static loadPostsFail(): Action {
        return {
            type: PostActions.LOAD_ENTITIES_FAIL,
        };
    }

    static BATCH_EDIT_ENTITIES = '[Post] Batch Edit Posts';
    static batchEditPosts(ids: number[]): Action {
        return {
            type: PostActions.BATCH_EDIT_ENTITIES,
            payload: ids
        };
    }

    static CANCEL_BATCH_EDIT_ENTITIES = '[Post] Cancel Batch Edit Posts';
    static cancelBatchEditPosts(): Action {
        return {
            type: PostActions.CANCEL_BATCH_EDIT_ENTITIES
        };
    }
    
    static BATCH_DELETE_ENTITIES = '[Post] Batch Delete Posts';
    static batchDeletePosts(ids: number[]): Action {
        return {
            type: PostActions.BATCH_DELETE_ENTITIES,
            payload: ids
        };
    }
    
    static BATCH_OFFLINE_EDIT_ENTITIES = '[Post] Batch Offline Edit Posts';
    static batchOfflineEditPosts(ids: number[]): Action {
        return {
            type: PostActions.BATCH_OFFLINE_EDIT_ENTITIES,
            payload: ids
        };
    }

    static BATCH_LOCK_ENTITIES = '[Post] Batch Lock Posts';
    static batchLockPosts(ids: number[]): Action {
        return {
            type: PostActions.BATCH_LOCK_ENTITIES,
            payload: ids
        };
    }

    static BATCH_EDIT_PREVIOUS_ENTITIY = '[Post] Batch Edit Previous Post';
    static batchEditPreviousPost(): Action {
        return {
            type: PostActions.BATCH_EDIT_PREVIOUS_ENTITIY
        };
    }

    static BATCH_EDIT_NEXT_ENTITIY = '[Post] Batch Edit Next Post';
    static batchEditNextPost(): Action {
        return {
            type: PostActions.BATCH_EDIT_NEXT_ENTITIY
        };
    }

    static NEW_ENTITIY = '[Post] New Post';
    static newPost(): Action {
        return {
            type: PostActions.NEW_ENTITIY
        };
    }

    static LOAD_ENTITIY = '[Post] Load Post';
    static loadPost(id: number): Action {
        return {
            type: PostActions.LOAD_ENTITIY,
            payload: id
        };
    }

    static LOAD_ENTITIY_SUCCESS = '[Post] Load Post Success';
    static loadPostSuccess(post: Post): Action {
        return {
            type: PostActions.LOAD_ENTITIY_SUCCESS,
            payload: post
        };
    }

    static LOAD_ENTITIY_FAIL = '[Post] Load Post Fail';
    static loadPostFail(): Action {
        return {
            type: PostActions.LOAD_ENTITIY_FAIL,
        };
    }

    static AUTO_SAVE = '[Post] Auto Save';
    static autoSave(post: Post): Action {
        return {
            type: PostActions.AUTO_SAVE,
            payload: post
        };
    }

    static SAVE_ENTITIY = '[Post] Save Post';
    static savePost(post: Post): Action {
        return {
            type: PostActions.SAVE_ENTITIY,
            payload: post
        };
    }

    static APPLY_REVISION = '[Post] Apply Revision';
    static applyRevision(ids: number[]): Action {
        return {
            type: PostActions.APPLY_REVISION,
            payload: ids
        };
    }
/*
    static SAVE_ENTITIY_AS_PENDING = '[Post] Save Post As Pending';
    static savePostAsPending(post: Post): Action {
        return {
            type: PostActions.SAVE_ENTITIY_AS_PENDING,
            payload: post
        };
    }

    static SAVE_ENTITIY_AS_DRAFT = '[Post] Save Post As Draft';
    static savePostAsDraft(post: Post): Action {
        return {
            type: PostActions.SAVE_ENTITIY_AS_DRAFT,
            payload: post
        };
    }

    static SAVE_ENTITIY_AS_PUBLISH = '[Post] Save Post As Publish';
    static savePostAsPublish(post: Post): Action {
        return {
            type: PostActions.SAVE_ENTITIY_AS_PUBLISH,
            payload: post
        };
    }
*/
    static SAVE_ENTITIY_SUCCESS = '[Post] Save Post Success';
    static savePostSuccess(post: Post): Action {
        return {
            type: PostActions.SAVE_ENTITIY_SUCCESS,
            payload: post
        };
    }

    static SAVE_ENTITIY_FAIL = '[Post] Save Post Fail';
    static savePostFail(): Action {
        return {
            type: PostActions.SAVE_ENTITIY_FAIL
        };
    }

    static SAVE_ENTITIES = '[Post] Save Posts';
    static savePosts(posts: Post[]): Action {
        return {
            type: PostActions.SAVE_ENTITIES,
            payload: posts
        };
    }

    static ADD_CATEGORY = '[Post] Add Category';
    static addCategory(cat: Category): Action {
        return {
            type: PostActions.ADD_CATEGORY,
            payload: cat
        };
    }

    static ADD_TAG = '[Post] Add Tag';
    static addTag(tag: Tag): Action {
        return {
            type: PostActions.ADD_TAG,
            payload: tag
        };
    }

    static ADD_TOPIC = '[Post] Add Topic';
    static addTopic(topic: Topic): Action {
        return {
            type: PostActions.ADD_TOPIC,
            payload: topic
        }
    }
    
    static REMOVE_CATEGORY = '[Post] Remove Category';
    static removeCategory(cat_id: number): Action {
        return {
            type: PostActions.REMOVE_CATEGORY,
            payload: cat_id
        };
    }

    static REMOVE_TAG = '[Post] Remove Tag';
    static removeTag(tag_id: number): Action {
        return {
            type: PostActions.REMOVE_TAG,
            payload: tag_id
        };
    }

    static REMOVE_TOPIC = '[Post] Remove Topic';
    static removeTopic(topic_id: number): Action {
        return {
            type: PostActions.REMOVE_TOPIC,
            payload: topic_id
        }
    }
    
    static REFRESH_ACTIVITY_STATUS = '[Post] Refresh Activity Status';
    static refreshActivityStatus(activities: Activity[]): Action {
        return {
            type: PostActions.REFRESH_ACTIVITY_STATUS,
            payload: activities
        };
    }
}