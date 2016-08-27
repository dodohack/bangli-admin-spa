import { Action }  from '@ngrx/store';
import { Post } from '../models';

export class PostActions {
    static SEARCH = '[Post] Search';
    static search(query: string): Action {
        return {
            type: PostActions.SEARCH,
            payload: query
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
    static loadPosts(filters:any): Action {
        return {
            type: PostActions.LOAD_POSTS,
            payload: filters
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
}