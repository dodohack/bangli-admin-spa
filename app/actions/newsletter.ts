import { Action }     from '@ngrx/store';
import { Newsletter } from '../models';

export class NewsletterActions {
    static SEARCH = '[Newsletter] Search';
    static search(params: any): Action {
        return {
            type: NewsletterActions.SEARCH,
            payload: params
        };
    }

    static SEARCH_COMPLETE = '[Newsletter] Search Complete';
    static searchComplete(results: Newsletter[]): Action {
        return {
            type: NewsletterActions.SEARCH_COMPLETE,
            payload: results
        };
    }

    static LOAD_NEWSLETTERS = '[Newsletter] Load Newsletters';
    static loadNewsletters(params: any): Action {
        return {
            type: NewsletterActions.LOAD_NEWSLETTERS,
            payload: params
        };
    }

    static LOAD_NEWSLETTERS_SUCCESS = '[Newsletter] Load Newsletters Success';
    static loadNewslettersSuccess(posts: Newsletter[]): Action {
        return {
            type: NewsletterActions.LOAD_NEWSLETTERS_SUCCESS,
            payload: posts
        };
    }

    static LOAD_NEWSLETTERS_FAIL = '[Newsletter] Load Newsletters Fail';
    static loadNewslettersFail(): Action {
        return {
            type: NewsletterActions.LOAD_NEWSLETTERS_FAIL,
        };
    }

    static BATCH_EDIT_NEWSLETTERS = '[Newsletter] Batch Edit Newsletters';
    static batchEditNewsletters(ids: number[]): Action {
        return {
            type: NewsletterActions.BATCH_EDIT_NEWSLETTERS,
            payload: ids
        };
    }

    static CANCEL_BATCH_EDIT_NEWSLETTERS = '[Newsletter] Cancel Batch Edit Newsletters';
    static cancelBatchEditNewsletters(): Action {
        return {
            type: NewsletterActions.CANCEL_BATCH_EDIT_NEWSLETTERS
        };
    }

    static BATCH_DELETE_NEWSLETTERS = '[Newsletter] Batch Delete Newsletters';
    static batchDeleteNewsletters(ids: number[]): Action {
        return {
            type: NewsletterActions.BATCH_DELETE_NEWSLETTERS,
            payload: ids
        };
    }

    static BATCH_OFFLINE_EDIT_NEWSLETTERS = '[Newsletter] Batch Offline Edit Newsletters';
    static batchOfflineEditNewsletters(ids: number[]): Action {
        return {
            type: NewsletterActions.BATCH_OFFLINE_EDIT_NEWSLETTERS,
            payload: ids
        };
    }

    static BATCH_LOCK_NEWSLETTERS = '[Newsletter] Batch Lock Newsletters';
    static batchLockNewsletters(ids: number[]): Action {
        return {
            type: NewsletterActions.BATCH_LOCK_NEWSLETTERS,
            payload: ids
        };
    }

    static BATCH_EDIT_PREVIOUS_NEWSLETTER = '[Newsletter] Batch Edit Previous Newsletter';
    static batchEditPreviousNewsletter(): Action {
        return {
            type: NewsletterActions.BATCH_EDIT_PREVIOUS_NEWSLETTER
        };
    }

    static BATCH_EDIT_NEXT_NEWSLETTER = '[Newsletter] Batch Edit Next Newsletter';
    static batchEditNextNewsletter(): Action {
        return {
            type: NewsletterActions.BATCH_EDIT_NEXT_NEWSLETTER
        };
    }

    static NEW_NEWSLETTER = '[Newsletter] New Newsletter';
    static newNewsletter(): Action {
        return {
            type: NewsletterActions.NEW_NEWSLETTER
        };
    }

    static LOAD_NEWSLETTER = '[Newsletter] Load Newsletter';
    static loadNewsletter(id: number): Action {
        return {
            type: NewsletterActions.LOAD_NEWSLETTER,
            payload: id
        };
    }

    static LOAD_NEWSLETTER_SUCCESS = '[Newsletter] Load Newsletter Success';
    static loadNewsletterSuccess(post: Newsletter): Action {
        return {
            type: NewsletterActions.LOAD_NEWSLETTER_SUCCESS,
            payload: post
        };
    }

    static LOAD_NEWSLETTER_FAIL = '[Newsletter] Load Newsletter Fail';
    static loadNewsletterFail(): Action {
        return {
            type: NewsletterActions.LOAD_NEWSLETTER_FAIL,
        };
    }

    static AUTO_SAVE = '[Newsletter] Auto Save';
    static autoSave(post: Newsletter): Action {
        return {
            type: NewsletterActions.AUTO_SAVE,
            payload: post
        };
    }

    static SAVE_NEWSLETTER = '[Newsletter] Save Newsletter';
    static saveNewsletter(post: Newsletter): Action {
        return {
            type: NewsletterActions.SAVE_NEWSLETTER,
            payload: post
        };
    }

    static APPLY_REVISION = '[Newsletter] Apply Revision';
    static applyRevision(ids: number[]): Action {
        return {
            type: NewsletterActions.APPLY_REVISION,
            payload: ids
        };
    }

    static SAVE_NEWSLETTER_SUCCESS = '[Newsletter] Save Newsletter Success';
    static saveNewsletterSuccess(post: Newsletter): Action {
        return {
            type: NewsletterActions.SAVE_NEWSLETTER_SUCCESS,
            payload: post
        };
    }

    static SAVE_NEWSLETTER_FAIL = '[Newsletter] Save Newsletter Fail';
    static saveNewsletterFail(): Action {
        return {
            type: NewsletterActions.SAVE_NEWSLETTER_FAIL
        };
    }

    static SAVE_NEWSLETTERS = '[Newsletter] Save Newsletters';
    static saveNewsletters(posts: Newsletter[]): Action {
        return {
            type: NewsletterActions.SAVE_NEWSLETTERS,
            payload: posts
        };
    }
    
    static REMOVE_CATEGORY = '[Newsletter] Remove Category';
    static removeCategory(cat_id: number): Action {
        return {
            type: NewsletterActions.REMOVE_CATEGORY,
            payload: cat_id
        };
    }

}
