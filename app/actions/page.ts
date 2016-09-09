import { Action }     from '@ngrx/store';
import { Page }       from '../models';
import { PageParams } from '../models';
import { Category }   from "../models";
import { Tag }        from "../models";
import { Topic }      from "../models";
import { Activity }   from '../models';

export class PageActions {
    static SEARCH = '[Page] Search';
    static search(params: PageParams): Action {
        return {
            type: PageActions.SEARCH,
            payload: params
        };
    }

    static SEARCH_COMPLETE = '[Page] Search Complete';
    static searchComplete(results: Page[]): Action {
        return {
            type: PageActions.SEARCH_COMPLETE,
            payload: results
        };
    }

    static LOAD_PAGES = '[Page] Load Pages';
    static loadPages(params: PageParams): Action {
        return {
            type: PageActions.LOAD_PAGES,
            payload: params
        };
    }

    static LOAD_PAGES_SUCCESS = '[Page] Load Pages Success';
    static loadPagesSuccess(posts: Page[]): Action {
        return {
            type: PageActions.LOAD_PAGES_SUCCESS,
            payload: posts
        };
    }

    static LOAD_PAGES_FAIL = '[Page] Load Pages Fail';
    static loadPagesFail(): Action {
        return {
            type: PageActions.LOAD_PAGES_FAIL,
        };
    }

    static BATCH_EDIT_PAGES = '[Page] Batch Edit Pages';
    static batchEditPages(ids: number[]): Action {
        return {
            type: PageActions.BATCH_EDIT_PAGES,
            payload: ids
        };
    }

    static CANCEL_BATCH_EDIT_PAGES = '[Page] Cancel Batch Edit Pages';
    static cancelBatchEditPages(): Action {
        return {
            type: PageActions.CANCEL_BATCH_EDIT_PAGES
        };
    }

    static BATCH_DELETE_PAGES = '[Page] Batch Delete Pages';
    static batchDeletePages(ids: number[]): Action {
        return {
            type: PageActions.BATCH_DELETE_PAGES,
            payload: ids
        };
    }

    static BATCH_OFFLINE_EDIT_PAGES = '[Page] Batch Offline Edit Pages';
    static batchOfflineEditPages(ids: number[]): Action {
        return {
            type: PageActions.BATCH_OFFLINE_EDIT_PAGES,
            payload: ids
        };
    }

    static BATCH_LOCK_PAGES = '[Page] Batch Lock Pages';
    static batchLockPages(ids: number[]): Action {
        return {
            type: PageActions.BATCH_LOCK_PAGES,
            payload: ids
        };
    }

    static BATCH_EDIT_PREVIOUS_PAGE = '[Page] Batch Edit Previous Page';
    static batchEditPreviousPage(): Action {
        return {
            type: PageActions.BATCH_EDIT_PREVIOUS_PAGE
        };
    }

    static BATCH_EDIT_NEXT_PAGE = '[Page] Batch Edit Next Page';
    static batchEditNextPage(): Action {
        return {
            type: PageActions.BATCH_EDIT_NEXT_PAGE
        };
    }

    static NEW_PAGE = '[Page] New Page';
    static newPage(): Action {
        return {
            type: PageActions.NEW_PAGE
        };
    }

    static LOAD_PAGE = '[Page] Load Page';
    static loadPage(id: number): Action {
        return {
            type: PageActions.LOAD_PAGE,
            payload: id
        };
    }

    static LOAD_PAGE_SUCCESS = '[Page] Load Page Success';
    static loadPageSuccess(post: Page): Action {
        return {
            type: PageActions.LOAD_PAGE_SUCCESS,
            payload: post
        };
    }

    static LOAD_PAGE_FAIL = '[Page] Load Page Fail';
    static loadPageFail(): Action {
        return {
            type: PageActions.LOAD_PAGE_FAIL,
        };
    }

    static AUTO_SAVE = '[Page] Auto Save';
    static autoSave(post: Page): Action {
        return {
            type: PageActions.AUTO_SAVE,
            payload: post
        };
    }

    static SAVE_PAGE = '[Page] Save Page';
    static savePage(post: Page): Action {
        return {
            type: PageActions.SAVE_PAGE,
            payload: post
        };
    }

    static APPLY_REVISION = '[Page] Apply Revision';
    static applyRevision(ids: number[]): Action {
        return {
            type: PageActions.APPLY_REVISION,
            payload: ids
        };
    }
    /*
     static SAVE_PAGE_AS_PENDING = '[Page] Save Page As Pending';
     static savePageAsPending(post: Page): Action {
     return {
     type: PageActions.SAVE_PAGE_AS_PENDING,
     payload: post
     };
     }

     static SAVE_PAGE_AS_DRAFT = '[Page] Save Page As Draft';
     static savePageAsDraft(post: Page): Action {
     return {
     type: PageActions.SAVE_PAGE_AS_DRAFT,
     payload: post
     };
     }

     static SAVE_PAGE_AS_PUBLISH = '[Page] Save Page As Publish';
     static savePageAsPublish(post: Page): Action {
     return {
     type: PageActions.SAVE_PAGE_AS_PUBLISH,
     payload: post
     };
     }
     */
    static SAVE_PAGE_SUCCESS = '[Page] Save Page Success';
    static savePageSuccess(post: Page): Action {
        return {
            type: PageActions.SAVE_PAGE_SUCCESS,
            payload: post
        };
    }

    static SAVE_PAGE_FAIL = '[Page] Save Page Fail';
    static savePageFail(): Action {
        return {
            type: PageActions.SAVE_PAGE_FAIL
        };
    }

    static SAVE_PAGES = '[Page] Save Pages';
    static savePages(posts: Page[]): Action {
        return {
            type: PageActions.SAVE_PAGES,
            payload: posts
        };
    }

    static ADD_CATEGORY = '[Page] Add Category';
    static addCategory(cat: Category): Action {
        return {
            type: PageActions.ADD_CATEGORY,
            payload: cat
        };
    }

    static ADD_TAG = '[Page] Add Tag';
    static addTag(tag: Tag): Action {
        return {
            type: PageActions.ADD_TAG,
            payload: tag
        };
    }

    static ADD_TOPIC = '[Page] Add Topic';
    static addTopic(topic: Topic): Action {
        return {
            type: PageActions.ADD_TOPIC,
            payload: topic
        }
    }

    static REMOVE_CATEGORY = '[Page] Remove Category';
    static removeCategory(cat_id: number): Action {
        return {
            type: PageActions.REMOVE_CATEGORY,
            payload: cat_id
        };
    }

    static REMOVE_TAG = '[Page] Remove Tag';
    static removeTag(tag_id: number): Action {
        return {
            type: PageActions.REMOVE_TAG,
            payload: tag_id
        };
    }

    static REMOVE_TOPIC = '[Page] Remove Topic';
    static removeTopic(topic_id: number): Action {
        return {
            type: PageActions.REMOVE_TOPIC,
            payload: topic_id
        }
    }

    static REFRESH_ACTIVITY_STATUS = '[Page] Refresh Activity Status';
    static refreshActivityStatus(activities: Activity[]): Action {
        return {
            type: PageActions.REFRESH_ACTIVITY_STATUS,
            payload: activities
        };
    }
}
