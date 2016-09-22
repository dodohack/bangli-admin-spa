/**
 * We have identical deal actions as cms. Following code is almost the same as
 * actions/post.ts.
 */
import { Action }     from '@ngrx/store';
import { PostParams } from '../models';
import { Post }       from '../models';
import { Category }   from "../models";
import { Tag }        from "../models";
import { Topic }      from "../models";
import { Activity }   from '../models';

export class DealPostActions {
    static SEARCH = '[DealPost] Search';
    static search(params: PostParams): Action {
        return {
            type: DealPostActions.SEARCH,
            payload: params
        };
    }

    static SEARCH_COMPLETE = '[DealPost] Search Complete';
    static searchComplete(results: Post[]): Action {
        return {
            type: DealPostActions.SEARCH_COMPLETE,
            payload: results
        };
    }

    static LOAD_POSTS = '[DealPost] Load Posts';
    static loadPosts(params: PostParams): Action {
        return {
            type: DealPostActions.LOAD_POSTS,
            payload: params
        };
    }

    static LOAD_POSTS_SUCCESS = '[DealPost] Load Posts Success';
    static loadPostsSuccess(posts: Post[]): Action {
        return {
            type: DealPostActions.LOAD_POSTS_SUCCESS,
            payload: posts
        };
    }

    static LOAD_POSTS_FAIL = '[DealPost] Load Posts Fail';
    static loadPostsFail(): Action {
        return {
            type: DealPostActions.LOAD_POSTS_FAIL,
        };
    }

    static BATCH_EDIT_POSTS = '[DealPost] Batch Edit Posts';
    static batchEditPosts(ids: number[]): Action {
        return {
            type: DealPostActions.BATCH_EDIT_POSTS,
            payload: ids
        };
    }

    static CANCEL_BATCH_EDIT_POSTS = '[DealPost] Cancel Batch Edit Posts';
    static cancelBatchEditPosts(): Action {
        return {
            type: DealPostActions.CANCEL_BATCH_EDIT_POSTS
        };
    }

    static BATCH_DELETE_POSTS = '[DealPost] Batch Delete Posts';
    static batchDeletePosts(ids: number[]): Action {
        return {
            type: DealPostActions.BATCH_DELETE_POSTS,
            payload: ids
        };
    }

    static BATCH_OFFLINE_EDIT_POSTS = '[DealPost] Batch Offline Edit Posts';
    static batchOfflineEditPosts(ids: number[]): Action {
        return {
            type: DealPostActions.BATCH_OFFLINE_EDIT_POSTS,
            payload: ids
        };
    }

    static BATCH_LOCK_POSTS = '[DealPost] Batch Lock Posts';
    static batchLockPosts(ids: number[]): Action {
        return {
            type: DealPostActions.BATCH_LOCK_POSTS,
            payload: ids
        };
    }

    static BATCH_EDIT_PREVIOUS_POST = '[DealPost] Batch Edit Previous Post';
    static batchEditPreviousPost(): Action {
        return {
            type: DealPostActions.BATCH_EDIT_PREVIOUS_POST
        };
    }

    static BATCH_EDIT_NEXT_POST = '[DealPost] Batch Edit Next Post';
    static batchEditNextPost(): Action {
        return {
            type: DealPostActions.BATCH_EDIT_NEXT_POST
        };
    }

    static NEW_POST = '[DealPost] New Post';
    static newPost(): Action {
        return {
            type: DealPostActions.NEW_POST
        };
    }

    static LOAD_POST = '[DealPost] Load Post';
    static loadPost(id: number): Action {
        return {
            type: DealPostActions.LOAD_POST,
            payload: id
        };
    }

    static LOAD_POST_SUCCESS = '[DealPost] Load Post Success';
    static loadPostSuccess(post: Post): Action {
        return {
            type: DealPostActions.LOAD_POST_SUCCESS,
            payload: post
        };
    }

    static LOAD_POST_FAIL = '[DealPost] Load Post Fail';
    static loadPostFail(): Action {
        return {
            type: DealPostActions.LOAD_POST_FAIL,
        };
    }

    static AUTO_SAVE = '[DealPost] Auto Save';
    static autoSave(post: Post): Action {
        return {
            type: DealPostActions.AUTO_SAVE,
            payload: post
        };
    }

    static SAVE_POST = '[DealPost] Save Post';
    static savePost(post: Post): Action {
        return {
            type: DealPostActions.SAVE_POST,
            payload: post
        };
    }

    static APPLY_REVISION = '[DealPost] Apply Revision';
    static applyRevision(ids: number[]): Action {
        return {
            type: DealPostActions.APPLY_REVISION,
            payload: ids
        };
    }

    static SAVE_POST_SUCCESS = '[DealPost] Save Post Success';
    static savePostSuccess(post: Post): Action {
        return {
            type: DealPostActions.SAVE_POST_SUCCESS,
            payload: post
        };
    }

    static SAVE_POST_FAIL = '[DealPost] Save Post Fail';
    static savePostFail(): Action {
        return {
            type: DealPostActions.SAVE_POST_FAIL
        };
    }

    static SAVE_POSTS = '[DealPost] Save Posts';
    static savePosts(posts: Post[]): Action {
        return {
            type: DealPostActions.SAVE_POSTS,
            payload: posts
        };
    }

    static ADD_CATEGORY = '[DealPost] Add Category';
    static addCategory(cat: Category): Action {
        return {
            type: DealPostActions.ADD_CATEGORY,
            payload: cat
        };
    }

    static ADD_TAG = '[DealPost] Add Tag';
    static addTag(tag: Tag): Action {
        return {
            type: DealPostActions.ADD_TAG,
            payload: tag
        };
    }

    static ADD_TOPIC = '[DealPost] Add Topic';
    static addTopic(topic: Topic): Action {
        return {
            type: DealPostActions.ADD_TOPIC,
            payload: topic
        }
    }

    static REMOVE_CATEGORY = '[DealPost] Remove Category';
    static removeCategory(cat_id: number): Action {
        return {
            type: DealPostActions.REMOVE_CATEGORY,
            payload: cat_id
        };
    }

    static REMOVE_TAG = '[DealPost] Remove Tag';
    static removeTag(tag_id: number): Action {
        return {
            type: DealPostActions.REMOVE_TAG,
            payload: tag_id
        };
    }

    static REMOVE_TOPIC = '[DealPost] Remove Topic';
    static removeTopic(topic_id: number): Action {
        return {
            type: DealPostActions.REMOVE_TOPIC,
            payload: topic_id
        }
    }

    static REFRESH_ACTIVITY_STATUS = '[DealPost] Refresh Activity Status';
    static refreshActivityStatus(activities: Activity[]): Action {
        return {
            type: DealPostActions.REFRESH_ACTIVITY_STATUS,
            payload: activities
        };
    }
}
