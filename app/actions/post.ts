import { Action }     from '@ngrx/store';
import { PostParams } from '../models';
import { Post }       from '../models';
import { Category }   from "../models";
import { Tag }        from "../models";
import { Topic }      from "../models";

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

    static LOAD_POSTS = '[Post] Load Posts';
    static loadPosts(params: PostParams): Action {
        return {
            type: PostActions.LOAD_POSTS,
            payload: params
        };
    }

    static LOAD_POSTS_SUCCESS = '[Post] Load Posts Success';
    static loadPostsSuccess(posts: Post[]): Action {
        return {
            type: PostActions.LOAD_POSTS_SUCCESS,
            payload: posts
        };
    }

    static LOAD_POSTS_FAIL = '[Post] Load Posts Fail';
    static loadPostsFail(): Action {
        return {
            type: PostActions.LOAD_POSTS_FAIL,
        };
    }

    static BATCH_EDIT_POSTS = '[Post] Batch Edit Posts';
    static batchEditPosts(ids: number[]): Action {
        return {
            type: PostActions.BATCH_EDIT_POSTS,
            payload: ids
        };
    }

    static CANCEL_BATCH_EDIT_POSTS = '[Post] Cancel Batch Edit Posts';
    static cancelBatchEditPosts(): Action {
        return {
            type: PostActions.CANCEL_BATCH_EDIT_POSTS
        };
    }

    static BATCH_EDIT_PREVIOUS_POST = '[Post] Batch Edit Previous Post';
    static batchEditPreviousPost(): Action {
        return {
            type: PostActions.BATCH_EDIT_PREVIOUS_POST
        };
    }

    static BATCH_EDIT_NEXT_POST = '[Post] Batch Edit Next Post';
    static batchEditNextPost(): Action {
        return {
            type: PostActions.BATCH_EDIT_NEXT_POST
        };
    }

    static NEW_POST = '[Post] New Post';
    static newPost(): Action {
        return {
            type: PostActions.NEW_POST
        };
    }

    static LOAD_POST = '[Post] Load Post';
    static loadPost(id: number): Action {
        return {
            type: PostActions.LOAD_POST,
            payload: id
        };
    }

    static LOAD_POST_SUCCESS = '[Post] Load Post Success';
    static loadPostSuccess(post: Post): Action {
        return {
            type: PostActions.LOAD_POST_SUCCESS,
            payload: post
        };
    }

    static LOAD_POST_FAIL = '[Post] Load Post Fail';
    static loadPostFail(): Action {
        return {
            type: PostActions.LOAD_POST_FAIL,
        };
    }

    static AUTO_SAVE = '[Post] Auto Save';
    static autoSave(post: Post): Action {
        return {
            type: PostActions.AUTO_SAVE,
            payload: post
        };
    }

    static SAVE_POST = '[Post] Save Post';
    static savePost(post: Post): Action {
        return {
            type: PostActions.SAVE_POST,
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
    static SAVE_POST_AS_PENDING = '[Post] Save Post As Pending';
    static savePostAsPending(post: Post): Action {
        return {
            type: PostActions.SAVE_POST_AS_PENDING,
            payload: post
        };
    }

    static SAVE_POST_AS_DRAFT = '[Post] Save Post As Draft';
    static savePostAsDraft(post: Post): Action {
        return {
            type: PostActions.SAVE_POST_AS_DRAFT,
            payload: post
        };
    }

    static SAVE_POST_AS_PUBLISH = '[Post] Save Post As Publish';
    static savePostAsPublish(post: Post): Action {
        return {
            type: PostActions.SAVE_POST_AS_PUBLISH,
            payload: post
        };
    }
*/
    static SAVE_POST_SUCCESS = '[Post] Save Post Success';
    static savePostSuccess(post: Post): Action {
        return {
            type: PostActions.SAVE_POST_SUCCESS,
            payload: post
        };
    }

    static SAVE_POST_FAIL = '[Post] Save Post Fail';
    static savePostFail(): Action {
        return {
            type: PostActions.SAVE_POST_FAIL
        };
    }

    static SAVE_POSTS = '[Post] Save Posts';
    static savePosts(posts: Post[]): Action {
        return {
            type: PostActions.SAVE_POSTS,
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
}