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

    static LOAD_ENTITIES = '[Page] Load Pages';
    static loadPages(params: PageParams): Action {
        return {
            type: PageActions.LOAD_ENTITIES,
            payload: params
        };
    }

    static LOAD_ENTITIES_SUCCESS = '[Page] Load Pages Success';
    static loadPagesSuccess(posts: Page[]): Action {
        return {
            type: PageActions.LOAD_ENTITIES_SUCCESS,
            payload: posts
        };
    }

    static LOAD_ENTITIES_FAIL = '[Page] Load Pages Fail';
    static loadPagesFail(): Action {
        return {
            type: PageActions.LOAD_ENTITIES_FAIL,
        };
    }

    static BATCH_EDIT_ENTITIES = '[Page] Batch Edit Pages';
    static batchEditPages(ids: number[]): Action {
        return {
            type: PageActions.BATCH_EDIT_ENTITIES,
            payload: ids
        };
    }

    static CANCEL_BATCH_EDIT_ENTITIES = '[Page] Cancel Batch Edit Pages';
    static cancelBatchEditPages(): Action {
        return {
            type: PageActions.CANCEL_BATCH_EDIT_ENTITIES
        };
    }

    static BATCH_DELETE_ENTITIES = '[Page] Batch Delete Pages';
    static batchDeletePages(ids: number[]): Action {
        return {
            type: PageActions.BATCH_DELETE_ENTITIES,
            payload: ids
        };
    }

    static BATCH_OFFLINE_EDIT_ENTITIES = '[Page] Batch Offline Edit Pages';
    static batchOfflineEditPages(ids: number[]): Action {
        return {
            type: PageActions.BATCH_OFFLINE_EDIT_ENTITIES,
            payload: ids
        };
    }

    static BATCH_LOCK_ENTITIES = '[Page] Batch Lock Pages';
    static batchLockPages(ids: number[]): Action {
        return {
            type: PageActions.BATCH_LOCK_ENTITIES,
            payload: ids
        };
    }

    static BATCH_EDIT_PREVIOUS_ENTITY = '[Page] Batch Edit Previous Page';
    static batchEditPreviousPage(): Action {
        return {
            type: PageActions.BATCH_EDIT_PREVIOUS_ENTITY
        };
    }

    static BATCH_EDIT_NEXT_ENTITY = '[Page] Batch Edit Next Page';
    static batchEditNextPage(): Action {
        return {
            type: PageActions.BATCH_EDIT_NEXT_ENTITY
        };
    }

    static NEW_ENTITY = '[Page] New Page';
    static newPage(): Action {
        return {
            type: PageActions.NEW_ENTITY
        };
    }

    static LOAD_ENTITY = '[Page] Load Page';
    static loadPage(id: number): Action {
        return {
            type: PageActions.LOAD_ENTITY,
            payload: id
        };
    }

    static LOAD_ENTITY_SUCCESS = '[Page] Load Page Success';
    static loadPageSuccess(post: Page): Action {
        return {
            type: PageActions.LOAD_ENTITY_SUCCESS,
            payload: post
        };
    }

    static LOAD_ENTITY_FAIL = '[Page] Load Page Fail';
    static loadPageFail(): Action {
        return {
            type: PageActions.LOAD_ENTITY_FAIL,
        };
    }

    static AUTO_SAVE = '[Page] Auto Save';
    static autoSave(post: Page): Action {
        return {
            type: PageActions.AUTO_SAVE,
            payload: post
        };
    }

    static SAVE_ENTITY = '[Page] Save Page';
    static savePage(post: Page): Action {
        return {
            type: PageActions.SAVE_ENTITY,
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
     static SAVE_ENTITY_AS_PENDING = '[Page] Save Page As Pending';
     static savePageAsPending(post: Page): Action {
     return {
     type: PageActions.SAVE_ENTITY_AS_PENDING,
     payload: post
     };
     }

     static SAVE_ENTITY_AS_DRAFT = '[Page] Save Page As Draft';
     static savePageAsDraft(post: Page): Action {
     return {
     type: PageActions.SAVE_ENTITY_AS_DRAFT,
     payload: post
     };
     }

     static SAVE_ENTITY_AS_PUBLISH = '[Page] Save Page As Publish';
     static savePageAsPublish(post: Page): Action {
     return {
     type: PageActions.SAVE_ENTITY_AS_PUBLISH,
     payload: post
     };
     }
     */
    static SAVE_ENTITY_SUCCESS = '[Page] Save Page Success';
    static savePageSuccess(post: Page): Action {
        return {
            type: PageActions.SAVE_ENTITY_SUCCESS,
            payload: post
        };
    }

    static SAVE_ENTITY_FAIL = '[Page] Save Page Fail';
    static savePageFail(): Action {
        return {
            type: PageActions.SAVE_ENTITY_FAIL
        };
    }

    static SAVE_ENTITIES = '[Page] Save Pages';
    static savePages(posts: Page[]): Action {
        return {
            type: PageActions.SAVE_ENTITIES,
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
